var loadState = {
	/*	var player;
	var platforms;
	var cursors;
	var movement = true;
	var phaserJSON*/


	preload: function(){
		game.load.image('sky', 'assets/sky2.png');
		game.load.spritesheet('dude', 'assets/spriteus33.png', 64, 142);
		game.load.image('star', 'assets/star.png');
		game.load.image('ground', 'assets/grass1.png');
		game.load.image('one', 'assets/one.png');
		game.load.image('buttonA', 'assets/button1.png');
		game.load.image('cloud', 'assets/cloud.png');
		game.load.json('rozmowa', 'assets/data/rozmowa3.json');
	},

	create: function(){
		game.state.start('play');
	}
};