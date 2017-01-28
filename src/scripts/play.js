var playState = {

	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
	    game.add.sprite(0, 0, 'sky');
		game.world.setBounds(0, 0, 1920, 383);
		
		phaserJSON = game.cache.getJSON('rozmowa');
		
		platforms = game.add.group();
		platforms.enableBody = true;
		
		player = game.add.sprite(32, game.world.height - 160, 'dude');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 0;//300;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		player.animations.add('right', [9, 10, 11, 12, 13, 14, 15, 16], 10, true);
		cursors = game.input.keyboard.createCursorKeys();
		
		game.camera.follow(player);
		
		stars = game.add.group();
		stars.enableBody = true;
		var star = stars.create(200, 350, 'star');
		star.body.setSize(200, 30, -80); 
		star.body.gravity.y = 0;

		var key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		key1.onDown.add(listener, this);
	},

	update: function(){
		game.physics.arcade.collide(player, platforms);
		game.physics.arcade.collide(stars, platforms);
		game.physics.arcade.overlap(player, stars, hover, null, this); //Star hover effect
		
		player.body.velocity.x = 0;
		if(movement==true)
		{
			if (cursors.left.isDown)
			{
				player.body.velocity.x = -150;
				player.animations.play('left');
			}
			else if (cursors.right.isDown)
			{
				player.body.velocity.x = 150;
				player.animations.play('right');
			}
			else
			{
				player.animations.stop();
				player.frame = 8;
			}
		}
	}
};

	function dialogueSystem() { 
		movement = false;
		player.animations.stop();
		player.frame = 8;
		var talkWindow = game.add.sprite(460, 210, 'buttonA');
		var cloudPosition = 210;
		var cloud = game.add.sprite(460, cloudPosition, 'cloud');
		cloud.alpha = 0.2;
		var a=1;
		var b=1;
		var c=1;
		var d=1;
		var textA;
		var textB;
		var textC;
		var textD;
		var textE;
		var keyJ = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		var keyM = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		var keyN = game.input.keyboard.addKey(Phaser.Keyboard.ENTER); 
		arrowMenu();
		
		
		function arrowMenu(){
			
			keyJ.onDown.add(upMenu, this);
			keyM.onDown.add(downMenu, this);
			keyN.onDown.add(choice, this);

			dialogueStart();
			
			
			var selected = 1;
			function upMenu() {
				cloudPosition-=20;
				if(cloudPosition<210) cloudPosition=290;
				selectCloud(cloudPosition);
				console.log(cloudPosition);
				selected -= 1;
			    if(selected<=0){
			      selected = 5;
			    }
			}
			function downMenu() {
				cloudPosition+=20;
				if(cloudPosition>290) cloudPosition=210;
				selectCloud(cloudPosition);
				console.log(cloudPosition);
				selected += 1;
			    if(selected>=6){
			      selected = 1;
			    }
			}
			function choice() {
				if(selected == 1) {
					upA();
					//arrowMenu();
					dialogueStart();
					return;
				}
				if(selected == 2) {
					upB();
					//arrowMenu();
					dialogueStart();
					return;
				}
				if(selected == 3) {
					upC();
					//arrowMenu();
					dialogueStart();
					return;
				}
				if(selected == 4) {
					upD();
					//arrowMenu();
					dialogueStart();
					return;
				}
				if(selected == 5){ 
					dismiss();
					clear();
					keyJ.onDown.removeAll();
					keyM.onDown.removeAll();
					keyN.onDown.removeAll();
					cloud.destroy();
					return;
				}
				return;
			}
			return;
		}

		function dialogueStart() {
			textA = game.add.text(game.world.centerX - 490, 210, "Q: " + phaserJSON.option1[a].call, { font: "10px Arial", fill: "#ff0044", align: "center" });
			textB = game.add.text(game.world.centerX - 490, 230, "W: " + phaserJSON.option2[b].call, { font: "10px Arial", fill: "#ff0044", align: "center" });
			textC = game.add.text(game.world.centerX - 490, 250, "E: " + phaserJSON.option3[c].call, { font: "10px Arial", fill: "#ff0044", align: "center" });
			textD = game.add.text(game.world.centerX - 490, 270, "R: " + phaserJSON.option4[d].call, { font: "10px Arial", fill: "#ff0044", align: "center" });
			textE = game.add.text(game.world.centerX - 490, 290, "T: exit", { font: "10px Arial", fill: "#ff0044", align: "center" });
		}

		function selectCloud(x){
			cloud.destroy();
			cloud = game.add.sprite(460, x, 'cloud');
			cloud.alpha = 0.2;
		}

		function keysDisable(){
				keyJ.enabled = false;
				keyM.enabled = false;
				keyN.enabled = false;
		}

		function keysEnable(){
				keyJ.enabled = true;
				keyM.enabled = true;
				keyN.enabled = true;
		}

		function upA() { 
			if(a!=0){
				keysDisable();
				clear();
				textF = game.add.text(game.world.centerX - 490, 270, phaserJSON.option1[a].answer, { font: "30px Arial", fill: "#ff0044", align: "center" });
				game.time.events.add(1000, function() {
					textF.destroy();
					keysEnable(); 
				}, this);
				(a<phaserJSON.option1[0].limit) ? a++ : a=0;
			}
			else {
				clear();
				return;
			}
		}
		function upB() {
			if(b!=0){
				keysDisable();
				clear();
				textF = game.add.text(game.world.centerX - 490, 270, phaserJSON.option2[b].answer, { font: "30px Arial", fill: "#ff0044", align: "center" });
				game.time.events.add(1000, function() {
					textF.destroy();
					keysEnable(); 
				}, this);
				(b<phaserJSON.option1[0].limit) ? b++ : b=0;
			}
			else {
				clear();
				return;
			}
		}
		function upC() { 
			if(c!=0){
				keysDisable();
				clear();
				textF = game.add.text(game.world.centerX - 490, 270, phaserJSON.option3[c].answer, { font: "30px Arial", fill: "#ff0044", align: "center" });
				game.time.events.add(1000, function() {
					textF.destroy();
					keysEnable(); 
				}, this);
				(c<phaserJSON.option1[0].limit) ? c++ : c=0;
			}
			else {
				clear();
				return;
			}
		}
		function upD() { 
			if(d!=0){
				keysDisable();
				clear();
				textF = game.add.text(game.world.centerX - 490, 270, phaserJSON.option4[d].answer, { font: "30px Arial", fill: "#ff0044", align: "center" });
				game.time.events.add(1000, function() {
					textF.destroy();
					keysEnable(); 
				}, this);
				(d<phaserJSON.option1[0].limit) ? d++ : d=0;
			}
			else {
				clear();
				return;
			}
		}
		function clear() {
			textA.destroy();
			textB.destroy();
			textC.destroy();
			textD.destroy();
			textE.destroy();
			return;
		}
		function dismiss() {
			textA.destroy();
			textB.destroy();
			textC.destroy();
			textD.destroy();
			textE.destroy();
			talkWindow.destroy();	
			movement = true;
		}
	}

	function hover () { 
		var oneHover = game.add.sprite(200, 300, 'one');
		game.time.events.add(50, function() {
				oneHover.destroy();
			}, this); 
	}

	function listener() { //check if player is overlapping whith star to start dialogue
		if(movement==true)
		{
			game.physics.arcade.overlap(player, stars, dialogueSystem, null, this);
		}
	}
