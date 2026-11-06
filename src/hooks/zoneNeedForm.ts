// // src/hooks/zoneNeedForm.ts
// import { useCallback, useRef, useState } from "react";
// import type { ScrollView } from "react-native";

// export interface SpeciesLine {
//   id: string;
//   speciesId?: number | null;
//   speciesLabel?: string;
// }

// const makeInitialSpeciesLines = (): SpeciesLine[] => [
//   { id: Date.now().toString(), speciesId: null, speciesLabel: "" },
// ];

// export const useZoneNeedForm = () => {
//   const [selectedZoneUuid, setSelectedZoneUuid] = useState<string | null>(null);
//   const [speciesLines, setSpeciesLines] = useState<SpeciesLine[]>(makeInitialSpeciesLines());
//   const [showZoneModal, setShowZoneModal] = useState<boolean>(false);
//   const [showSpeciesModal, setShowSpeciesModal] = useState<string | null>(null);

//   // ref du ScrollView (à attacher côté composant)
//   const scrollRef = useRef<ScrollView | null>(null);

//   const resetForm = useCallback(() => {
//     setSelectedZoneUuid(null);
//     setSpeciesLines(makeInitialSpeciesLines());
//     setShowZoneModal(false);
//     setShowSpeciesModal(null);
//     // scroll to top (petit timeout pour laisser le layout se stabiliser)
//     setTimeout(() => {
//       scrollRef.current?.scrollTo?.({ y: 0, animated: true });
//     }, 50);
//   }, []);

//   const addSpeciesLine = useCallback(() => {
//     setSpeciesLines(prev => [
//       ...prev,
//       { id: Date.now().toString(), speciesId: null, speciesLabel: "" },
//     ]);
//   }, []);

//   const removeSpeciesLine = useCallback((id: string) => {
//     setSpeciesLines(prev => (prev.length > 1 ? prev.filter(l => l.id !== id) : prev));
//   }, []);

//   const updateSpeciesLine = useCallback((id: string, speciesId: number, speciesLabel: string) => {
//     setSpeciesLines(prev => prev.map(l => (l.id === id ? { ...l, speciesId, speciesLabel } : l)));
//   }, []);

//   return {
//     // state
//     selectedZoneUuid,
//     setSelectedZoneUuid,
//     speciesLines,
//     showZoneModal,
//     setShowZoneModal,
//     showSpeciesModal,
//     setShowSpeciesModal,
//     scrollRef,

//     // helpers
//     resetForm,
//     addSpeciesLine,
//     removeSpeciesLine,
//     updateSpeciesLine,
//   };
// };
