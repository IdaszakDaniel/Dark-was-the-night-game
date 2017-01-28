var game = new Phaser.Game(799, 383, Phaser.AUTO, 'gameDiv');
	var player;
	var platforms;
	var cursors;
	var movement = true;
	var phaserJSON;

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('play', playState);

game.state.start('boot');