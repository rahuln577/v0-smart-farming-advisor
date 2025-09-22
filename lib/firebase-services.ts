import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "./firebase"

// User Profile Service
export const userService = {
  async getUserProfile(userId: string) {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null
  },

  async updateUserProfile(userId: string, data: any) {
    const docRef = doc(db, "users", userId)
    await updateDoc(docRef, { ...data, updatedAt: new Date() })
  },
}

// Farm Locations Service
export const locationService = {
  async getFarmLocations(userId: string) {
    const q = query(collection(db, "farmLocations"), where("userId", "==", userId), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },

  async addFarmLocation(userId: string, locationData: any) {
    const docRef = await addDoc(collection(db, "farmLocations"), {
      ...locationData,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return docRef.id
  },

  async updateFarmLocation(locationId: string, data: any) {
    const docRef = doc(db, "farmLocations", locationId)
    await updateDoc(docRef, { ...data, updatedAt: new Date() })
  },

  async deleteFarmLocation(locationId: string) {
    await deleteDoc(doc(db, "farmLocations", locationId))
  },
}

// Crop Tracking Service
export const cropService = {
  async getCropRecords(userId: string) {
    const q = query(collection(db, "cropRecords"), where("userId", "==", userId), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },

  async addCropRecord(userId: string, cropData: any, imageFile?: File) {
    let imageUrl = null

    if (imageFile) {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `crop-images/${userId}/${Date.now()}-${imageFile.name}`)
      const snapshot = await uploadBytes(imageRef, imageFile)
      imageUrl = await getDownloadURL(snapshot.ref)
    }

    const docRef = await addDoc(collection(db, "cropRecords"), {
      ...cropData,
      userId,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return docRef.id
  },

  async updateCropRecord(recordId: string, data: any) {
    const docRef = doc(db, "cropRecords", recordId)
    await updateDoc(docRef, { ...data, updatedAt: new Date() })
  },
}

// Weather Alerts Service
export const weatherService = {
  async getWeatherAlerts(userId: string) {
    const q = query(collection(db, "weatherAlerts"), where("userId", "==", userId), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },

  async addWeatherAlert(userId: string, alertData: any) {
    await addDoc(collection(db, "weatherAlerts"), {
      ...alertData,
      userId,
      createdAt: new Date(),
    })
  },
}

// Market Data Service
export const marketService = {
  async getMarketPrices(region = "all") {
    const q =
      region === "all"
        ? query(collection(db, "marketPrices"), orderBy("updatedAt", "desc"))
        : query(collection(db, "marketPrices"), where("region", "==", region), orderBy("updatedAt", "desc"))

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },

  async getUserPriceAlerts(userId: string) {
    const q = query(collection(db, "priceAlerts"), where("userId", "==", userId), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },

  async addPriceAlert(userId: string, alertData: any) {
    await addDoc(collection(db, "priceAlerts"), {
      ...alertData,
      userId,
      createdAt: new Date(),
    })
  },
}

// Chat Service
export const chatService = {
  async getChatHistory(userId: string) {
    const q = query(collection(db, "chatMessages"), where("userId", "==", userId), orderBy("timestamp", "asc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },

  async addChatMessage(userId: string, message: any) {
    await addDoc(collection(db, "chatMessages"), {
      ...message,
      userId,
      timestamp: new Date(),
    })
  },

  // Real-time chat subscription
  subscribeToChatMessages(userId: string, callback: (messages: any[]) => void) {
    const q = query(collection(db, "chatMessages"), where("userId", "==", userId), orderBy("timestamp", "asc"))

    return onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      callback(messages)
    })
  },
}
