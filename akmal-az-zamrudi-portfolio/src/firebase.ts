import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  User,
  onAuthStateChanged
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc,
  getDocFromServer
} from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Standard handleFirestoreError from firebase-integration skill instructions
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Check connectivity on initialization
async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.error("Please check your Firebase configuration: Client is offline.");
    }
  }
}
testConnection();

// Authentication helpers
export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Auth sign-in failed:", error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Log out failed:", error);
    throw error;
  }
}

// Helpers to read lists
export async function fetchProjectsFromFirestore() {
  const path = "projects";
  try {
    const snapshot = await getDocs(collection(db, path));
    return snapshot.docs.map(d => d.data());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function fetchPublicationsFromFirestore() {
  const path = "publications";
  try {
    const snapshot = await getDocs(collection(db, path));
    return snapshot.docs.map(d => d.data());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function fetchMilestonesFromFirestore() {
  const path = "milestones";
  try {
    const snapshot = await getDocs(collection(db, path));
    return snapshot.docs.map(d => d.data());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

// Write / updates
export async function saveProjectToFirestore(project: any) {
  const path = `projects/${project.id}`;
  try {
    await setDoc(doc(db, "projects", project.id), project);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function savePublicationToFirestore(pub: any) {
  const path = `publications/${pub.id}`;
  try {
    await setDoc(doc(db, "publications", pub.id), pub);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function saveMilestoneToFirestore(milestone: any) {
  const path = `milestones/${milestone.id}`;
  try {
    await setDoc(doc(db, "milestones", milestone.id), milestone);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Deletions
export async function deleteProjectFromFirestore(id: string) {
  const path = `projects/${id}`;
  try {
    await deleteDoc(doc(db, "projects", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function deletePublicationFromFirestore(id: string) {
  const path = `publications/${id}`;
  try {
    await deleteDoc(doc(db, "publications", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function deleteMilestoneFromFirestore(id: string) {
  const path = `milestones/${id}`;
  try {
    await deleteDoc(doc(db, "milestones", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
