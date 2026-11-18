# Architecture

## Framework

React Native

## Language

TypeScript

## Navigation

expo Router

## Global State

Zustand

## Server State

RTK Query. In-memory cache of the latest API response. Clear this cache on sign-out.

## Forms

React Hook Form

## Validation

Zod

## Storage

- Token: react-native-keychain. Nowhere else.
- Chats, messages, and history: SQLite with expo-sqlite. The list must open with no network.
- A photo or file attached to a message: a file on disk with expo-file-system. SQLite stores the path only.
- Photos shown on screen: expo-image cache.
- A small preference, such as theme: react-native-mmkv.
  A secret goes to react-native-keychain. A list that must still be there after the app closes goes to SQLite.

## Networking

Redux toolkit

## Authentication

Managed exclusively with Zustand.

## Error Handling

Centralized error manager.

## Dependency Injection

Service-based architecture.
