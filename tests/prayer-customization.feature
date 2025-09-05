Feature: Personnalisation des Playlists de Prière
  En tant qu'utilisateur musulman
  Je veux personnaliser mes playlists de prière
  Pour adapter les sourates selon mes préférences

  Background:
    Given je suis dans le mode prière guidée
    And j'ai cliqué sur "Personnaliser"

  Scenario: Modifier les sourates d'une rakah
    Given je vois l'interface de personnalisation
    When je sélectionne la rakah 1
    Then je vois les sourates actuelles pour cette rakah
    And je peux ajouter de nouvelles sourates
    And je peux supprimer des sourates existantes
    And je peux réorganiser l'ordre des sourates

  Scenario: Ajouter une sourate personnalisée
    Given je modifie une rakah
    When je clique sur "Ajouter une sourate"
    Then je vois la liste des sourates disponibles
    When je sélectionne "Al-Ikhlas"
    Then "Al-Ikhlas" est ajoutée à la rakah
    And je vois le texte arabe, la translittération et la traduction

  Scenario: Valider les modifications
    Given j'ai modifié ma playlist
    When je clique sur "Sauvegarder"
    Then mes modifications sont enregistrées
    And je retourne au mode prière guidée
    And ma playlist personnalisée est active

  Scenario: Annuler les modifications
    Given j'ai fait des modifications non sauvegardées
    When je clique sur "Annuler"
    Then je retourne au mode prière guidée
    And mes modifications sont perdues
    And la playlist originale est restaurée

  Scenario: Restaurer les paramètres par défaut
    Given j'ai une playlist personnalisée
    When je clique sur "Restaurer par défaut"
    Then la playlist revient aux sourates par défaut
    And mes personnalisations sont supprimées
    And je vois un message de confirmation
