Feature: Mode Prière Guidée
  En tant qu'utilisateur musulman
  Je veux utiliser le mode prière guidée
  Pour réciter mes prières avec des playlists personnalisées

  Background:
    Given je suis sur la page de prière
    And l'application est chargée

  Scenario: Accéder au mode prière guidée
    Given je suis sur l'onglet "Apprentissage"
    When je clique sur l'onglet "Prière Guidée"
    Then je vois la sélection des prières
    And je vois les 5 prières disponibles (Fajr, Dhuhr, Asr, Maghrib, Isha)

  Scenario: Sélectionner une prière
    Given je suis dans le mode prière guidée
    When je clique sur la prière "Fajr"
    Then la prière Fajr est sélectionnée
    And je vois la playlist par défaut pour Fajr
    And je vois le composant de récitation guidée

  Scenario: Réciter une sourate avec audio
    Given j'ai sélectionné une prière
    And je vois la première sourate de la playlist
    When je clique sur le bouton "Réciter"
    Then l'audio de la sourate commence
    And le bouton change pour "Pause"
    And la barre de progression commence à avancer

  Scenario: Naviguer entre les sourates
    Given je suis en train de réciter une prière
    And je ne suis pas à la première sourate
    When je clique sur "Précédent"
    Then je reviens à la sourate précédente
    And l'audio s'arrête
    And la progression se remet à zéro

  Scenario: Personnaliser une playlist
    Given je suis dans le mode prière guidée
    When je clique sur "Personnaliser"
    Then je vois l'interface de personnalisation
    And je peux modifier les sourates pour chaque rakah
    And je peux sauvegarder ma playlist personnalisée

  Scenario: Voir la progression de la prière
    Given je récite une prière guidée
    Then je vois ma position actuelle (ex: "1/7")
    And je vois la liste complète des sourates
    And la sourate actuelle est mise en évidence

  Scenario: Contrôler l'audio
    Given l'audio est en cours de lecture
    When je clique sur le bouton muet
    Then l'audio s'arrête
    And l'icône change pour "Volume coupé"
    When je clique à nouveau sur le bouton
    Then l'audio peut reprendre
    And l'icône redevient normale

  Scenario: Compléter une prière guidée
    Given je récite la dernière sourate d'une prière
    When la récitation se termine
    Then je vois un message de félicitations
    And mes statistiques de prière sont mises à jour
    And je peux choisir de recommencer ou changer de prière

  Scenario: Sauvegarder les préférences
    Given j'ai personnalisé une playlist
    When je sauvegarde mes modifications
    Then ma playlist personnalisée est stockée
    And elle apparaît la prochaine fois que je sélectionne cette prière
    And je peux revenir aux paramètres par défaut si souhaité
