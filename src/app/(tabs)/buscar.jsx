import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMascotas } from '../../context/mascotasContext';

export default function Buscar() {
  const { mascotas, loadingMascotas } = useMascotas();
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [ageRange, setAgeRange] = useState({ min: 0, max: 20 });
  const [sizeFilter, setSizeFilter] = useState('');

  const filteredMascotas = useMemo(() => {
    const search = searchText.toLowerCase().trim();

    return mascotas.filter((mascota) => {
      const nameMatch = mascota.name?.toLowerCase().includes(search);
      const breedMatch = mascota.breed?.toLowerCase().includes(search);
      const ageMatch = String(mascota.age)?.toLowerCase().includes(search);
      const typeMatch = mascota.type?.toLowerCase().includes(search);
      const textMatch = !search || nameMatch || breedMatch || ageMatch || typeMatch;

      const matchesType = !typeFilter || mascota.type?.toLowerCase() === typeFilter.toLowerCase();
      const matchesAge = mascota.age >= ageRange.min && mascota.age <= ageRange.max;
      const matchesSize = !sizeFilter || mascota.size?.toLowerCase() === sizeFilter.toLowerCase();

      return textMatch && matchesType && matchesAge && matchesSize;
    });
  }, [mascotas, searchText, typeFilter, ageRange, sizeFilter]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Buscar Mascotas</Text>

        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre..."
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>Tipo:</Text>
          <View style={styles.filterRow}>
            {['', 'perro', 'gato'].map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => setTypeFilter(type)}
                style={[
                  styles.filterButton,
                  typeFilter === type && styles.filterButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    typeFilter === type && styles.filterButtonTextActive,
                  ]}
                >
                  {type === '' ? 'Todos' : type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.filterTitle}>Tamaño:</Text>
          <View style={styles.filterRow}>
            {['', 'pequeño', 'mediano', 'grande'].map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => setSizeFilter(size)}
                style={[
                  styles.filterButton,
                  sizeFilter === size && styles.filterButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    sizeFilter === size && styles.filterButtonTextActive,
                  ]}
                >
                  {size === '' ? 'Todos' : size.charAt(0).toUpperCase() + size.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.filterTitle}>Edad:</Text>
          <View style={styles.ageInputs}>
            <TextInput
              style={styles.ageInput}
              placeholder="Min"
              keyboardType="numeric"
              value={String(ageRange.min)}
              onChangeText={(val) =>
                setAgeRange((prev) => ({ ...prev, min: Number(val) || 0 }))
              }
            />
            <TextInput
              style={styles.ageInput}
              placeholder="Max"
              keyboardType="numeric"
              value={String(ageRange.max)}
              onChangeText={(val) =>
                setAgeRange((prev) => ({ ...prev, max: Number(val) || 20 }))
              }
            />
          </View>
        </View>

        {/* Mascotas List */}
        {filteredMascotas.length === 0 && !loadingMascotas ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={40} color="#888" />
            <Text style={styles.emptyText}>No se encontraron resultados.</Text>
          </View>
        ) : (
          <FlatList
            data={filteredMascotas}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <ImageBackground
                  source={{ uri: item.photo }}
                  style={styles.image}
                  imageStyle={styles.imageStyle}
                >
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>
                      {item.adopted ? 'Adoptado' : 'En Adopción'}
                    </Text>
                  </View>
                  <View style={styles.overlay}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.description}>
                      {item.description || 'Este animalito busca un hogar lleno de amor.'}
                    </Text>
                    <View style={styles.infoRow}>
                      {item.breed && (
                        <View style={styles.infoTag}>
                          <Text style={styles.infoText}>{item.breed}</Text>
                        </View>
                      )}
                      {item.age && (
                        <View style={styles.infoTag}>
                          <Text style={styles.infoText}>{item.age} años</Text>
                        </View>
                      )}
                      {item.type && (
                        <View style={styles.infoTag}>
                          <Text style={styles.infoText}>{item.type}</Text>
                        </View>
                      )}
                      {item.size && (
                        <View style={styles.infoTag}>
                          <Text style={styles.infoText}>{item.size}</Text>
                        </View>
                      )}
                      {item.location && (
                        <View style={styles.infoTag}>
                          <Ionicons
                            name="location"
                            size={12}
                            color="#444"
                            style={{ marginRight: 4 }}
                          />
                          <Text style={styles.infoText}>{item.location}</Text>
                        </View>
                      )}
                    </View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        // TODO: Add navigation to details
                      }}
                    >
                      <Text style={styles.buttonText}>Ver detalles</Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    paddingTop: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filterTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  filterButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  filterButtonActive: {
    backgroundColor: '#FF0000',
  },
  filterButtonText: {
    color: '#000',
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ageInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  ageInput: {
    flex: 1,
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
  },
  card: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    height: 280,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 15,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  name: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: '#eee',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    marginBottom: 15,
  },
  infoTag: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 5,
  },
  infoText: {
    color: '#444',
    fontSize: 12,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FF0000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    zIndex: 1,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
