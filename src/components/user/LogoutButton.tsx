import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

type LogoutButtonProps = {
  onLogout: (event: GestureResponderEvent) => void;
};

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onLogout}>
      <Text style={styles.text}>SAIR DA CONTA</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8a2be2',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
