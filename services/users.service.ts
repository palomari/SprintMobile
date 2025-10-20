import { db, auth } from '../services/firebase';
import {
  doc, setDoc, getDoc, updateDoc, deleteDoc,
} from 'firebase/firestore';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';

export interface UserProfile {
  id: string;
  name: string;
  email: string;          
  phone?: string;
  address?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  notificationsEnabled?: boolean;
}

export function mapFirebaseError(code?: string, fallback = 'Algo deu errado.') {
  switch (code) {
    case 'auth/invalid-email': return 'E-mail inválido.';
    case 'auth/weak-password': return 'A nova senha é muito curta (mínimo de 6 caracteres).';
    case 'auth/wrong-password':
    case 'auth/invalid-credential': return 'Senha atual incorreta.';
    case 'auth/user-not-found': return 'Usuário não encontrado.';
    case 'auth/requires-recent-login': return 'Por segurança, faça login novamente e tente de novo.';
    case 'auth/too-many-requests': return 'Muitas tentativas. Tente novamente em alguns minutos.';
    case 'auth/unauthorized-domain': return 'Domínio não autorizado no Firebase Authentication.';
    default: return fallback;
  }
}

/* CREATE */
export async function registerUser(
  name: string,
  email: string,
  password: string,
  extras?: { cpf?: string; birthDate?: string; phone?: string; address?: string }
): Promise<UserProfile> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;
  const now = new Date().toISOString();
  const profile: UserProfile = {
    id: uid,
    name,
    email,
    phone: extras?.phone,
    address: extras?.address,
    createdAt: now,
    updatedAt: now,
  };
  await setDoc(doc(db, 'users', uid), profile);
  return profile;
}


/* READ */
export async function getUserProfile(uid: string): Promise<UserProfile> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) throw new Error('Perfil não encontrado.');
  return snap.data() as UserProfile;
}

/* Ensure (auto-seed) */
export async function ensureUserProfile(uid: string): Promise<UserProfile> {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as UserProfile;

  const user: User | null = auth.currentUser;
  if (!user) throw new Error('Usuário não autenticado.');

  const now = new Date().toISOString();
  const seeded: UserProfile = {
    id: uid,
    name: user.displayName || 'Usuário',
    email: user.email || '',
    phone: '',
    address: '',
    createdAt: now,
    updatedAt: now,
    notificationsEnabled: true,
  };
  await setDoc(ref, seeded);
  return seeded;
}

/* UPDATE (Firestore) — nome/telefone/endereço/flags */
export async function updateUserProfile(uid: string, patch: Partial<UserProfile>) {
  await updateDoc(doc(db, 'users', uid), {
    ...patch,
    updatedAt: new Date().toISOString(),
  });
}

/* UPDATE credenciais — **apenas senha** (email NÃO pode ser alterado no app) */
export async function updatePasswordSecure(params: {
  currentPassword: string;
  newPassword: string;
}) {
  const user = auth.currentUser;
  if (!user?.email) throw new Error('Usuário não autenticado.');

  const cred = EmailAuthProvider.credential(user.email, params.currentPassword);
  await reauthenticateWithCredential(user, cred);
  await updatePassword(user, params.newPassword);
}

/* DELETE (reauth + Firestore + Auth) */
export async function deleteUserAccountSecure(currentPassword: string) {
  const user = auth.currentUser;
  if (!user?.email) throw new Error('Usuário não autenticado.');
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);

  await deleteDoc(doc(db, 'users', user.uid));
  await user.delete();
}

/* LOGIN / LOGOUT */
export async function loginUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
export async function logoutUser() {
  await signOut(auth);
}
