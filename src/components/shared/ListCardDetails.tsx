import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from 'src/assets';
import ListCard from './ListCard';
import PressableButton from './Pressable';
import ViewRow from './ViewRow';

type propType = {
  title: string;
  children: React.ReactNode;
  style?: ViewStyle;
};
const ListCardDetails = ({title, children, style}: propType) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <ListCard>
      <ViewRow>
        <Text>{title}</Text>
        <TouchableOpacity
          style={{marginLeft: 'auto'}}
          onPress={() => setShowDetails(prev => !prev)}>
          <ViewRow>
            <Text style={styles.text}>Show details</Text>
          </ViewRow>
        </TouchableOpacity>
      </ViewRow>
      {showDetails && children}
    </ListCard>
  );
};

export default ListCardDetails;

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
  },
});
