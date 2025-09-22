import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let isConfigured = firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.authDomain

let app: any
let auth: any
let db: any
let storage: any

if (isConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)

    console.log("[Firebase] Successfully initialized with real configuration")
  } catch (error) {
    console.error("[Firebase] Initialization error:", error)
    isConfigured = false
  }
}

if (!isConfigured) {
  console.warn("[Firebase] Using mock services. Add Firebase environment variables to enable real functionality.")

  auth = {
    currentUser: null,
    onAuthStateChanged: (callback: any) => {
      // Simulate no user logged in
      setTimeout(() => callback(null), 100)
      return () => {} // Return unsubscribe function
    },
    signInWithEmailAndPassword: async (email: string, password: string) => {
      // Mock successful login
      const mockUser = {
        uid: "mock-user-id",
        email: email,
        displayName: email.split("@")[0],
        photoURL: null,
      }
      return { user: mockUser }
    },
    createUserWithEmailAndPassword: async (email: string, password: string) => {
      // Mock successful signup
      const mockUser = {
        uid: "mock-user-id",
        email: email,
        displayName: email.split("@")[0],
        photoURL: null,
      }
      return { user: mockUser }
    },
    signOut: async () => {
      console.log("[Firebase Mock] User signed out")
    },
  }

  db = {
    collection: (path: string) => ({
      doc: (id?: string) => ({
        get: async () => ({
          exists: false,
          data: () => null,
          id: id || "mock-doc-id",
        }),
        set: async (data: any) => {
          console.log(`[Firebase Mock] Set document in ${path}:`, data)
        },
        update: async (data: any) => {
          console.log(`[Firebase Mock] Update document in ${path}:`, data)
        },
        delete: async () => {
          console.log(`[Firebase Mock] Delete document in ${path}`)
        },
      }),
      add: async (data: any) => {
        console.log(`[Firebase Mock] Add document to ${path}:`, data)
        return { id: "mock-doc-id" }
      },
      where: (field: string, operator: string, value: any) => ({
        get: async () => ({
          empty: true,
          docs: [],
          forEach: () => {},
        }),
      }),
      orderBy: (field: string, direction?: string) => ({
        limit: (count: number) => ({
          get: async () => ({
            empty: true,
            docs: [],
            forEach: () => {},
          }),
        }),
      }),
    }),
  }

  storage = {
    ref: (path: string) => ({
      put: async (file: any) => {
        console.log(`[Firebase Mock] Upload file to ${path}`)
        return {
          ref: {
            getDownloadURL: async () => "https://via.placeholder.com/400x300?text=Mock+Image",
          },
        }
      },
      getDownloadURL: async () => "https://via.placeholder.com/400x300?text=Mock+Image",
    }),
  }

  app = null
}

export { auth, db, storage }
export default app
