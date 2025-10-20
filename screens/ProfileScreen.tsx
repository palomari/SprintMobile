import React, { useEffect, useState } from 'react';
import {
  ScrollView, View, Text, StyleSheet, TouchableOpacity, Switch, Image,
  Modal, TextInput, SafeAreaView, ActivityIndicator, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase';
import {
  ensureUserProfile,
  updateUserProfile,
  updatePasswordSecure,
  deleteUserAccountSecure,
  type UserProfile,
  mapFirebaseError,
} from '../services/users.service';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { logout } = useAuth();
  const navigation = useNavigation<any>();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(''); 

  const [saveError, setSaveError] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<string>('');
  const [deleteError, setDeleteError] = useState<string>('');

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function loadProfile() {
    setLoading(true);
    setLoadError('');
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error('Usuário não autenticado.');
      const p = await ensureUserProfile(uid);
      setProfile(p);
      setName(p.name);
      setPhone(p.phone || '');
      setAddress(p.address || '');
      setNotificationsEnabled(p.notificationsEnabled ?? true);
    } catch (e: any) {
      const msg = mapFirebaseError(e?.code, e?.message || 'Não foi possível carregar o perfil.');
      setLoadError(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadProfile(); }, []);

  const lastActivity = (() => {
    const meta = auth.currentUser?.metadata;
    if (!meta) return null;
    const t = meta.lastSignInTime || meta.creationTime;
    return t ? new Date(t) : null;
  })();

  async function handleToggleNotifications(v: boolean) {
    setNotificationsEnabled(v);
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      await updateUserProfile(uid, { notificationsEnabled: v } as any);
      setSaveSuccess(v ? 'Notificações ativadas.' : 'Notificações desativadas.');
      setSaveError('');
      setTimeout(() => setSaveSuccess(''), 3000);
    } catch {
      setNotificationsEnabled(!v);
      setSaveError('Não foi possível atualizar as notificações.');
      setTimeout(() => setSaveError(''), 4000);
    }
  }

  async function handleSave() {
    setSaveError('');
    setSaveSuccess('');

    const uid = auth.currentUser?.uid;
    if (!uid) return;

    if (!name.trim()) {
      setSaveError('Informe o nome.');
      return;
    }
    if (newPassword && newPassword.length < 6) {
      setSaveError('A nova senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    setSaving(true);
    try {
      await updateUserProfile(uid, {
        name: name.trim(),
        phone: phone.trim() || undefined,
        address: address.trim() || undefined,
      });
      setProfile(p => p ? ({
        ...p,
        name: name.trim(),
        phone: phone.trim() || undefined,
        address: address.trim() || undefined,
      }) : p);

      if (newPassword.trim()) {
        if (!currentPassword.trim()) {
          setSaving(false);
          setSaveError('Informe a senha atual para alterar a senha.');
          return;
        }
        try {
          await updatePasswordSecure({
            currentPassword: currentPassword.trim(),
            newPassword: newPassword.trim(),
          });
        } catch (e: any) {
          const msg = mapFirebaseError(e?.code, e?.message || 'Não foi possível alterar a senha.');
          setSaving(false);
          setSaveError(msg);
          return;
        }
      }

      setEditOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setSaveSuccess('Perfil atualizado com sucesso!');
      setTimeout(() => setSaveSuccess(''), 3000);
    } catch (e: any) {
      setSaveError(e?.message || 'Não foi possível atualizar o perfil.');
      setTimeout(() => setSaveError(''), 4000);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleteError('');
    if (!currentPassword.trim()) {
      setDeleteError('Informe sua senha para encerrar a conta.');
      return;
    }
    setDeleting(true);
    try {
      await deleteUserAccountSecure(currentPassword.trim());
    } catch (e: any) {
      const msg = mapFirebaseError(e?.code, e?.message || 'Não foi possível encerrar a conta.');
      setDeleteError(msg);
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems:'center' }]}>
        <Text style={styles.title}>Configurações</Text>
        <ActivityIndicator />
        <Text style={styles.loading}>Carregando perfil…</Text>
      </SafeAreaView>
    );
  }

  if (loadError) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems:'center' }]}>
        <Text style={styles.title}>Configurações</Text>
        <Text style={[styles.loading, { color:'#ff7070', marginBottom:12 }]}>{loadError}</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={loadProfile}>
          <Text style={styles.primaryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems:'center' }]}>
        <Text style={styles.title}>Configurações</Text>
        <Text style={styles.loading}>Perfil não encontrado.</Text>
        <TouchableOpacity style={[styles.primaryBtn, { marginTop:12 }]} onPress={loadProfile}>
          <Text style={styles.primaryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.profileCard}>
        {profile.avatarUrl
          ? <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
          : <Image source={require('../assets/user.png')} style={styles.avatar} />
        }
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{profile.name || 'Usuário'}</Text>
          <Text style={styles.activity}>E-mail (fixo): {profile.email}</Text>
          {lastActivity && (
            <>
              <Text style={styles.activity}>Última atividade:</Text>
              <Text style={styles.activityDate}>
                {lastActivity.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}{' '}
                às {lastActivity.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.optionBox}>
        <View style={styles.optionItem}>
          <Text style={styles.optionLabel}>Idioma</Text>
          <Text style={styles.optionValue}>Português</Text>
        </View>

        <View style={styles.optionItem}>
          <Text style={styles.optionLabel}>Notificação</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleToggleNotifications}
            trackColor={{ false: '#666', true: '#34C759' }}
            thumbColor={notificationsEnabled ? '#fff' : '#ccc'}
          />
        </View>

        <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Contato')}>
          <Text style={styles.optionLabel}>Contato</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => { setEditOpen(true); setSaveError(''); setSaveSuccess(''); }}
        >
          <Text style={styles.optionLabel}>Editar perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionItem, { backgroundColor: '#5a1f1f' }]}
          onPress={() => { setDeleteOpen(true); setCurrentPassword(''); setDeleteError(''); }}
        >
          <Text style={styles.optionLabel}>Encerrar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionItem, { backgroundColor: '#3a3a3c' }]}
          onPress={logout}
        >
          <Text style={styles.optionLabel}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={editOpen} transparent animationType="slide" onRequestClose={() => setEditOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Editar perfil</Text>

            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nome" placeholderTextColor="#aaa" />
            <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Endereço" placeholderTextColor="#aaa" />
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Telefone" keyboardType="phone-pad" placeholderTextColor="#aaa" />

            <View style={styles.divider} />
            <Text style={styles.section}>Trocar senha (opcional)</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Nova senha (opcional)"
              secureTextEntry
              placeholderTextColor="#aaa"
            />
            {newPassword.length >= 6 && (
              <TextInput
                style={styles.input}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Senha atual (obrigatória para trocar a senha)"
                secureTextEntry
                placeholderTextColor="#aaa"
              />
            )}

            <View style={styles.modalActionsColumn}>
              {saveError ? <Text style={styles.errorText}>{saveError}</Text> : null}
              {saveSuccess ? <Text style={styles.successText}>{saveSuccess}</Text> : null}

              <View style={styles.modalActionsRow}>
                <TouchableOpacity style={styles.outlineBtn} onPress={() => setEditOpen(false)} disabled={saving}>
                  <Text style={styles.outlineText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.primaryBtn} onPress={handleSave} disabled={saving}>
                  {saving ? <ActivityIndicator color="#000" /> : <Text style={styles.primaryText}>Salvar</Text>}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={deleteOpen} transparent animationType="fade" onRequestClose={() => setDeleteOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Encerrar conta</Text>
            <Text style={styles.helper}>Por segurança, informe sua senha para confirmar.</Text>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Senha atual"
              secureTextEntry
              placeholderTextColor="#aaa"
            />

            {deleteError ? <Text style={styles.errorText}>{deleteError}</Text> : null}

            <View style={styles.modalActionsRow}>
              <TouchableOpacity
                style={styles.outlineBtn}
                onPress={() => { setDeleteOpen(false); setCurrentPassword(''); setDeleteError(''); }}
                disabled={deleting}
              >
                <Text style={styles.outlineText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.primaryBtn, { backgroundColor: '#e53935' }]}
                onPress={handleDelete}
                disabled={deleting}
              >
                {deleting ? <ActivityIndicator color="#000" /> : <Text style={styles.primaryText}>Encerrar</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  scrollContent: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 80 },
  content: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 100 },
  title: {
    fontSize: 33, fontWeight: 'bold', marginBottom: 20, textAlign: 'center',
    fontFamily: Platform.OS === 'web' ? undefined : 'BebasNeue_400Regular', color: '#F7D269',
  },
  loading: { color: '#fff', textAlign: 'center', marginTop: 8 },

  profileCard: { backgroundColor: '#2b2b2b', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  avatar: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: '#34C759', marginRight: 16, backgroundColor: '#1c1c1c' },
  profileInfo: { flex: 1 },
  username: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  activity: { fontSize: 12, color: '#aaa', marginTop: 4 },
  activityDate: { fontSize: 12, color: '#ccc' },

  optionBox: { backgroundColor: '#2b2b2b', borderRadius: 12, padding: 12 },
  optionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3a3a3c', borderRadius: 10, padding: 14, marginBottom: 12 },
  optionLabel: { fontSize: 16, color: '#fff' },
  optionValue: { fontSize: 16, color: '#ccc' },

  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,.6)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  modal: { width: '100%', maxWidth: 540, backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16 },
  modalTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  helper: { color: '#ddd', marginBottom: 8 },

  input: { backgroundColor: '#1f1f1f', color: '#fff', borderRadius: 10, padding: 12, marginBottom: 10 },
  divider: { height: 1, backgroundColor: '#333', marginVertical: 6 },
  section: { color: '#bbb', fontSize: 12, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },

  modalActionsColumn: { marginTop: 6 },
  modalActionsRow: { flexDirection: 'row', gap: 10, justifyContent: 'flex-end', alignItems: 'center' },

  errorText: { color: '#ff7070', marginBottom: 8 },
  successText: { color: '#7ee2a8', marginBottom: 8 },

  outlineBtn: { borderColor: '#F7D269', borderWidth: 1, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 16 },
  outlineText: { color: '#F7D269', fontWeight: '700' },
  primaryBtn: { backgroundColor: '#F7D269', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 16, minWidth: 110, alignItems: 'center' },
  primaryText: { color: '#000', fontWeight: '700' },
});
