// components/MatchesScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import playersData from "../utils/StarWarsPlayers.json";
import matchesData from "../utils/StarWarsMatches.json";

const MatchesScreen = ({ route }) => {
  const { playerId } = route.params;
  const [playerMatches, setPlayerMatches] = useState([]);

  useEffect(() => {
    // Filter matches where the selected player participated
    const filteredMatches = matchesData.filter(
      (match) => match.player1.id === playerId || match.player2.id === playerId
    );

    // Sort matches from most recent to oldest
    const sortedMatches = filteredMatches.sort((a, b) => b.match - a.match);

    setPlayerMatches(sortedMatches);
  }, [playerId]);

  const getPlayerName = (id) => {
    const player = playersData.find((player) => player.id === id);
    return player ? player.name : "Unknown Player";
  };

  const renderMatchItem = ({ item }) => {
    const isPlayer1 = item.player1.id === playerId;
    const isPlayer2 = item.player2.id === playerId;

    let resultColor = "";

    if (item.player1.score === item.player2.score) {
      resultColor = "white";
    } else if (
      (isPlayer1 && item.player1.score > item.player2.score) ||
      (isPlayer2 && item.player2.score > item.player1.score)
    ) {
      resultColor = "green";
    } else {
      resultColor = "red";
    }

    return (
      <View style={[styles.matchItem, { backgroundColor: resultColor }]}>
        <View style={styles.playerContainer}>
          <Text style={styles.playerName}>
            {getPlayerName(item.player1.id)}
          </Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            {`${item.player1.score} - ${item.player2.score}`}
          </Text>
        </View>
        <View style={styles.playerContainer}>
          <Text style={styles.playerName}>
            {getPlayerName(item.player2.id)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={playerMatches}
      keyExtractor={(item) => item.match.toString()}
      renderItem={renderMatchItem}
    />
  );
};

const styles = StyleSheet.create({
  matchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  playerContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  playerName: {
    fontSize: 16,
  },
  scoreContainer: {
    flex: 1,
    alignItems: "center",
  },
  scoreText: {
    fontSize: 16,
  },
});

export default MatchesScreen;
