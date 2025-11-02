// hooks/useBottomSheet.tsx
import React, { createContext, useContext, useRef, useState, ReactNode } from 'react';
import { Modalize } from 'react-native-modalize';
import { View } from 'react-native';

type BottomSheetContextType = {
  openSheet: () => void;
  closeSheet: () => void;
  setContent: (content: ReactNode, height?: number) => void;
};

const BottomSheetContext = createContext<BottomSheetContextType>({
  openSheet: () => {},
  closeSheet: () => {},
  setContent: () => {},
});

export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const modalRef = useRef<Modalize>(null);
  const [content, setContentState] = useState<ReactNode>(null);
  const [sheetHeight, setSheetHeight] = useState<number>(300); // default height

  const openSheet = () => modalRef.current?.open();
  const closeSheet = () => modalRef.current?.close();

  const setContent = (c: ReactNode, height?: number) => {
    setContentState(c);
    if (height) setSheetHeight(height);
  };

  return (
    <BottomSheetContext.Provider value={{ openSheet, closeSheet, setContent }}>
      {children}

      <Modalize
        ref={modalRef}
        modalHeight={sheetHeight}
        handleStyle={{ backgroundColor: '#000' }}
        adjustToContentHeight={false} // can also set true if content is small
      >
        <View>{content}</View>
      </Modalize>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => useContext(BottomSheetContext);
