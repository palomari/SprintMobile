# 🎯 App de Apostas & Investimentos — SprintMobile

Aplicativo mobile interativo e educativo desenvolvido para o desafio da disciplina **Mobile Development & IoT (XP Educação)**.

Criado com **React Native + Expo**, o app proporciona uma experiência gamificada entre **apostar** ou **investir**, com foco em **acessibilidade, usabilidade e identidade visual moderna**.  
Toda a autenticação e persistência são realizadas via **Firebase Authentication** e **AsyncStorage**.


---

## 🧩 Funcionalidades Principais

### 🚀 Introdução
- Três telas de **onboarding** (`IntroSports`, `IntroPrizes`, `IntroDeposit`)
- Exibidas **apenas na primeira execução**, controladas via AsyncStorage
- Splash inicial informativo e orientado por rolagem

### 🔐 Autenticação
- Login e cadastro via **e-mail e senha**
- Autenticação segura com **Firebase Auth**
- Persistência local com **AsyncStorage**
- Mensagens de erro e sucesso com feedback visual claro
- Logout e exclusão de conta com **reauthenticação**

### 🏟️ Apostas Esportivas
- Listagem de partidas por liga (CBF, NBA, NHL)
- Seleção de vencedor, valor e forma de pagamento
- Registro de apostas com status e placar fictício
- Histórico de apostas com status e resultado simulados

### 💼 Investimentos
- Quatro modalidades: **Renda Fixa, FIIs, CDB e Ações**
- Rendimento visualizado em **gráficos interativos**
- Operações simuladas (não salvas no histórico de apostas)

### 🧾 Pagamentos e Comprovante
- Simulação completa de pagamento
- Tela splash + opções de pagamento + tela de sucesso
- Exibição de **comprovante estilo recibo** com valor, método e parcelas

### 📊 Histórico
- Exibe apenas **apostas**
- Mostra placar, status, valor ganho/perdido e data
- Permite rastrear a atividade do usuário

### 👤 Perfil e Suporte
- Exibe nome, e-mail e última atividade
- Permite **editar dados pessoais** (nome, telefone, endereço e senha)
- Opção de **encerrar conta**
- Alternar **idioma** e **notificações**
- Acesso a **Chatbot** e **Tela de Contato**

---

## 🛠 Tecnologias Utilizadas

| Categoria | Tecnologias |
|------------|-------------|
| Framework | ⚛️ **React Native (Expo SDK 53)** |
| Navegação | 📱 **React Navigation v6** (Stack + Bottom Tabs) |
| Armazenamento Local | 💾 **AsyncStorage** |
| Backend | 🔥 **Firebase Authentication + Firestore** |
| Estado Global | 🧠 **Context API (AuthContext)** |
| Tipagem | 🔧 **TypeScript** |
| UI e Estilo | 🎨 **StyleSheet** |
| Animações | 🎞️ **Lottie (via URL)** |

---

## 👥 Equipe

| Nome                          | RM       |
|-------------------------------|----------|
| Leticia Fontana Baptista      | 550289   |
| Julia Palomari                | 551910   |
| Vinicius Sobreira Borges      | 97767    |
| Julia Ortiz                   | 550204   |
| Guilherme Catelli Bichaco     | 97989    |

---

> 📱 Projeto acadêmico — XP Educação | Mobile Development
