import { create } from "zustand";

interface Document {
    id: number;
    title: string;
    downloadURL: string;
    tokenized_text: string;
    metadata: string;
    upload_timestamp: Date;
    user_id: string;
}

type State = {
    docs: Document[];
};

type Action = {
    setDocs: (docs: Document[]) => void;
    addDoc: (doc: Document) => void;
    updateDoc: (doc: Partial<Document> & { id: number }) => void;
    removeDoc: (docId: number) => void;
};

const useDocStore = create<State & Action>((set) => ({
    docs: [],

    setDocs: (newDocs) => set({ docs: newDocs }),

    addDoc: (newDoc) =>
        set((state) => ({
            docs: [...state.docs, newDoc],
        })),

    updateDoc: (updatedDoc) =>
        set((state) => ({
            docs: state.docs.map((doc) =>
                doc.id === updatedDoc.id ? { ...doc, ...updatedDoc } : doc
            ),
        })),

    removeDoc: (docId) =>
        set((state) => ({
            docs: state.docs.filter((doc) => doc.id !== docId),
        })),
}));

export default useDocStore;
