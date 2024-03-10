import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import playersData from "../utils/StarWarsPlayers.json";
import matchesData from "../utils/StarWarsMatches.json";

const PointsTable = () => {
  const [pointsTable, setPointsTable] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Map matches to each player based on ID
    const playerMatches = {};
    matchesData.forEach((match) => {
      const { player1, player2 } = match;
      if (!playerMatches[player1.id]) {
        playerMatches[player1.id] = [];
      }
      if (!playerMatches[player2.id]) {
        playerMatches[player2.id] = [];
      }
      playerMatches[player1.id].push(player1.score);
      playerMatches[player2.id].push(player2.score);
    });

    // Calculate total score and number of matches played for each player
    const calculatedPointsTable = playersData.map((player) => ({
      ...player,
      totalScore: (playerMatches[player.id] || []).reduce(
        (acc, score) => acc + score,
        0
      ),
      matchesPlayed: (playerMatches[player.id] || []).length,
    }));

    // Sort players based on total scores and number of matches played
    const sortedPointsTable = calculatedPointsTable.sort((a, b) => {
      if (b.totalScore !== a.totalScore) {
        return b.totalScore - a.totalScore;
      }
      // If total scores are the same, arrange in descending order of matches played
      return b.matchesPlayed - a.matchesPlayed;
    });

    setPointsTable(sortedPointsTable);
  }, []);

  const handlePlayerPress = (playerId) => {
    navigation.navigate("MatchesScreen", { playerId });
  };

  const renderPlayerItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.playerItem}
        onPress={() => handlePlayerPress(item.id)}
      >
        <Image source={{ uri: item.icon }} style={styles.playerIcon} />
        <Text style={styles.playerName}>{item.name}</Text>
        <Text style={styles.totalScore}>{item.totalScore}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={pointsTable}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderPlayerItem}
    />
  );
};

const styles = StyleSheet.create({
  playerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  playerIcon: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  playerName: {
    flex: 1,
    fontSize: 18,
  },
  totalScore: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default PointsTable;
