import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
} from "react-native";

const BIO_LIMIT = 120;

const SettingsRow = ({ label, children, theme }) => {
  return (
    <View style={[styles.settingsRow, { borderBottomColor: theme.border }]}>
      <Text style={{ color: theme.text }}>{label}</Text>
      {children}
    </View>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(false);

  const theme = isDark
    ? {
        background: "#121212",
        text: "#fff",
        card: "#1e1e1e",
        border: "#333",
      }
    : {
        background: "#f2f2f2",
        text: "#000",
        card: "#fff",
        border: "#ccc",
      };

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    bio: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Imię jest wymagane";
    }

    if (!form.email.includes("@")) {
      newErrors.email = "Niepoprawny e-mail";
    }

    if (form.bio.length > BIO_LIMIT) {
      newErrors.bio = "Bio jest za długie";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage("❌ Popraw błędy w formularzu");
    } else {
      setErrors({});
      setMessage("✅ Zapisano poprawnie!");
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* PROFIL */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.avatar} />
        <Text style={[styles.name, { color: theme.text }]}>
          {form.name || "Twoje imię"}
        </Text>
        <Text style={{ color: theme.text }}>{form.city || "Twoje miasto"}</Text>
        <Text style={{ color: theme.text }}>
          {form.bio || "Krótki opis..."}
        </Text>
      </View>

      {/* FORMULARZ */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Edytuj dane
        </Text>

        <TextInput
          placeholder="Imię"
          style={styles.input}
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <TextInput
          placeholder="Miasto"
          style={styles.input}
          value={form.city}
          onChangeText={(text) => handleChange("city", text)}
        />

        <TextInput
          placeholder="Bio"
          style={[styles.input, { height: 80 }]}
          multiline
          value={form.bio}
          onChangeText={(text) => handleChange("bio", text)}
        />
        <Text style={{ alignSelf: "flex-end" }}>
          {form.bio.length}/{BIO_LIMIT}
        </Text>
        {errors.bio && <Text style={styles.error}>{errors.bio}</Text>}

        {/* HASŁO */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            placeholder="Hasło"
            style={[styles.input, { flex: 1 }]}
            secureTextEntry={!showPassword}
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Text style={{ marginLeft: 10 }}>
              {showPassword ? "Ukryj" : "Pokaż"}
            </Text>
          </Pressable>
        </View>

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Zapisz zmiany</Text>
        </Pressable>

        {message !== "" && <Text style={styles.message}>{message}</Text>}
      </View>

      {/* USTAWIENIA */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Ustawienia
        </Text>

        <SettingsRow label="Powiadomienia" theme={theme}>
          <Switch />
        </SettingsRow>

        <SettingsRow label="Prywatność" theme={theme}>
          <Text>›</Text>
        </SettingsRow>

        <SettingsRow label="Ciemny motyw" theme={theme}>
          <Switch value={isDark} onValueChange={setIsDark} />
        </SettingsRow>

        <SettingsRow label="O aplikacji" theme={theme}>
          <Text>›</Text>
        </SettingsRow>
      </View>

      {/* WYLOGUJ */}
      <Pressable style={styles.logout}>
        <Text style={{ color: "red" }}>Wyloguj</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: "#ccc",
    borderRadius: 40,
    alignSelf: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
  message: {
    marginTop: 10,
    fontWeight: "bold",
  },
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  logout: {
    alignItems: "center",
    margin: 20,
  },
});
