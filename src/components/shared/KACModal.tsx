import React from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

// Keyboard Avoiding Component Modal
const KACModal: React.FC<ModalProps> = ({visible, onClose, children}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{flex: 1}}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1, justifyContent: 'center'}}
            keyboardVerticalOffset={50} // adjust the offset as needed
          >
            <TouchableWithoutFeedback onPress={() => null}>
              <View
                style={
                  {
                    // backgroundColor: 'white',
                    // padding: 20,
                    // borderRadius: 10,
                    // margin: 50,
                    // //   flex: 1,
                  }
                }>
                {children}
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default KACModal;
