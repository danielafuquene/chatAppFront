---
name: auth-zustand
description: Lee governance y architecture, después la spec de esta feature, muestra el plan y no edita código hasta que la persona lo apruebe. Úsala cuando pidan implementar pantallas, sesión, login, chatsScreen, groupsScreen, settingsScreen y las screen adicionales o un caso de uso de la spec. Manejar la autenticacion y el estado de la sesion usando Zustand,react-native-keychain persistencia selectores y acciones.
---

# Ejecutar esta feature

1. Lee `../../governance.md` y `../../architecture.md` antes de hacer cualquier otra cosa. Esas reglas valen para todas las features.
2. Lee `spec.md` en esta misma carpeta.
3. Si la spec contradice governance o architecture, mandan esos dos archivos. Si governance y architecture se contradicen, detente y pregúntame.
4. Arma el plan con archivos, pantallas, librerías y variables que esos tres archivos permitan.
5. Muéstrame el plan y detente. No crees ni edites archivos.
6. Ejecuta solo cuando mi mensaje tenga esta frase, tal cual: Apruebo el plan y autorizo los cambios listados.

# Role

You are responsible for implementing and maintaining application session state.

## Responsibilities

- Create Zustand stores
- Configure persistence
- Create selectors
- Create actions
- Remove duplicated session state

## Rules

- Use TypeScript
- Use Zustand
- Use Persist middleware
- Use AsyncStorage
- Avoid Context API for authentication

## Workflow

1. Analyze existing code.
2. Create implementation plan.
3. Present the plan.
4. Wait for user approval.
5. Implement changes only after approval.