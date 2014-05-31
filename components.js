/**
 * Components
 * Created by CreaturePhil - https://github.com/CreaturePhil
 *
 * These are custom commands for the server. This is put in a seperate file
 * from commands.js and config/commands.js to not interfere with them.
 * In addition, it is easier to manage when put in a seperate file.
 * Most of these commands depend on core.js.
 *
 * Command categories: General, Staff, Server Management
 *
 * @license MIT license
 */

var fs = require("fs");
var path = require("path");

var components = exports.components = {
afk: 'away',
	afk: 'sleeping',
	afk: 'gaming',
	afk: 'coding',
	afk: 'stuff',
	afk: 'eating',
	away: function(target, room, user, connection) {
		if (!this.can('broadcast')) return false;
		if (!user.isAway) {
			var originalName = user.name;
			var awayName = user.name + ' - Away';
			delete Users.get(awayName);
			user.forceRename(awayName, undefined, true);
			this.add('|raw|-- <b><font color="#7e8491">' + originalName +'</font color></b> is now away. '+ (target ? " (" + target + ")" : ""));
			user.isAway = true;
		}
		else {
			return this.sendReply('You are already set as away, type /back if you are now back');
		}
		user.updateIdentity();
	},
	sleeping: function(target, room, user, connection) {
		if (!this.can('broadcast')) return false;
		if (!user.Sleeping) {
			var originalName = user.name;
			var sleepingName = user.name + ' - Sleeping';
			delete Users.get(sleepingName);
			user.forceRename(sleepingName, undefined, true);
			this.add('|raw|-- <b><font color="#7e8491">' + originalName +'</font color></b> is now sleeping. '+ (target ? " (" + target + ")" : ""));
			user.isSleeping = true;
		}
		else {
			return this.sendReply('You are already set as away, type /awake if you are now back');
		}
		user.updateIdentity();
	},
	gaming: function(target, room, user, connection) {
		if (!this.can('broadcast')) return false;
		if (!user.isGaming) {
			var originalName = user.name;
			var gamingName = user.name + ' - Gaming';
			delete Users.get(gamingName);
			user.forceRename(gamingName, undefined, true);
			this.add('|raw|-- <b><font color="#7e8491">' + originalName +'</font color></b> is now gaming. '+ (target ? " (" + target + ")" : ""));
			user.isGaming = true;
		}
		else {
			return this.sendReply('You are already set as gaming, type /computering if you are now back');
		}
		user.updateIdentity();
	},
	coding: function(target, room, user, connection) {
		if (!this.can('broadcast')) return false;
		if (!user.isCoding) {
			var originalName = user.name;
			var codingName = user.name + ' - Coding';
			delete Users.get(codingName);
			user.forceRename(codingName, undefined, true);
			this.add('|raw|-- <b><font color="#9a9a9a">' + originalName +'</font color></b> is now Coding. '+ (target ? " (" + target + ")" : ""));
			user.isCoding = true;
		}
		else {
			return this.sendReply('You are already set as away, type /relaxing if you are now back');
		}
		user.updateIdentity();
	},	
	stuff: function(target, room, user, connection) {
		if (!this.can('broadcast')) return false;
		if (!user.isStuff) {
			var originalName = user.name;
			var stuffName = user.name + ' - Stuff';
			delete Users.get(stuffName);
			user.forceRename(stuffName, undefined, true);
			this.add('|raw|-- <b><font color="#7e8491">' + originalName +'</font color></b> is now away. '+ (target ? " (" + target + ")" : ""));
			user.isStuff = true;
		}
		else {
			return this.sendReply('You are already set as away, type /non if you are now back');
		}
		user.updateIdentity();
	},
	/*
	eating: function(target, room, user, connection) {
		if (!this.can('broadcast')) return false;
		if (!user.isEating) {
			var originalName = user.name;
			var EatingName = user.name + ' - Eating';
			delete Users.get(awayName);
			user.forceRename(awayName, undefined, true);
			this.add('|raw|-- <b><font color="#7e8491">' + originalName +'</font color></b> is now eating. '+ (target ? " (" + target + ")" : ""));
			user.isAway = true;
		}
		else {
			return this.sendReply('You are already set as away, type /full if you are now back');
		}
		user.updateIdentity();
	},
	*/
	unafk: 'unafk',
	unafk: 'back',
	unafk: 'awake',
	unafk: 'computering',
	unafk: 'relaxing',
	unafk: 'non',
	unafk: 'full',
	back: function(target, room, user, connection) {
		if (!this.can('broadcast')) return false;
		if (user.isAway) {
			var name = user.name;
			var newName = name.substr(0, name.length - 7);
			delete Users.get(newName);
			user.forceRename(newName, undefined, true);
			user.authenticated = true;
			this.add('|raw|-- <b><font color="#cccdd1">' + newName + '</font color></b> is no longer away');
			user.isAway = false;
		}
		else {
			return this.sendReply('You are not set as away');
		}
		user.updateIdentity();
	},
	awake: function(target, room, user, connection) {
		if (!this.can('broadcast')) return false;
		if (user.isSleeping) {
			var name = user.name;
			var newName = name.substr(0, name.length - 11);
			delete Users.get(newName);
			user.forceRename(newName, undefined, true);
			user.authenticated = true;
			this.add('|raw|-- <b><font color="#cccdd1">' + newName + '</font color></b> is no longer sleeping');
			user.isSleeping = false;
		}
		else {
			return this.sendReply('You are not set as away');
		}
		user.updateIdentity();
	},
	computering: function(target, room, user, connection) {
		if (!this.can('broadcast')) return false;
		if (user.isGaming) {
			var name = user.name;
			var newName = name.substr(0, name.length - 9);
			delete Users.get(newName);
			user.forceRename(newName, undefined, true);
			user.authenticated = true;
			this.add('|raw|-- <b><font color="#cccdd1">' + newName + '</font color></b> is no longer gaming');
			user.isGaming = false;
		}
		else {
			return this.sendReply('You are not set as gaming');
		}
		user.updateIdentity();
	},
	relaxing: function(target, room, user, connection) {
		if (!this.can('broadcast')) return false;
		if (user.isCoding) {
			var name = user.name;
			var newName = name.substr(0, name.length - 9);
			delete Users.get(newName);
			user.forceRename(newName, undefined, true);
			user.authenticated = false;
			this.add('|raw|-- <b><font color="#cccdd1">' + newName + '</font color></b> is no longer coding');
			user.isCoding = false;
		}
		else {
			return this.sendReply('You are not set as away');
		}
		user.updateIdentity();
	},
	non: function(target, room, user, connection) {
		if (!this.can('broadcast')) return false;
		if (user.isStuff) {
			var name = user.name;
			var newName = name.substr(0, name.length - 8);
			delete Users.get(newName);
			user.forceRename(newName, undefined, true);
			user.authenticated = true;
			this.add('|raw|-- <b><font color="#cccdd1">' + newName + '</font color></b> is no longer away');
			user.isStuff = false;
		}
		else {
			return this.sendReply('You are not set as away');
		}
		user.updateIdentity();
	},
	/*full: function(target, room, user, connection) {
		if (!this.can('broadcast')) return false;
		if (user.isEating) {
			var name = user.name;
			var newName = name.substr(0, name.length - 9);
			delete Users.get(newName);
			user.forceRename(newName, undefined, true);
			user.authenticated = true;
			this.add('|raw|-- <b><font color="#cccdd1">' + newName + '</font color></b> is no longer eating');
			user.isAway = false;
		}
		else {
			return this.sendReply('You are not set as full');
		}
		user.updateIdentity();
	},
	*/
    earnbuck: 'earnmoney',
    earnbucks: 'earnmoney',
    earnmoney: function (target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<strong><u>Ways to earn money:</u></strong><br /><br /><ul><li>Give Rival Nick some plugins to get 5 bucks.</li>Once you done so pm an admin. If you like this server, Go to Github <a href="http://github.com/Creaturephil/" />and star</a> him. Have Fun at the Skypillar Server!</ul>');
    },
	
	roomauth: function(target, room, user, connection) {
		if (!room.auth) return this.sendReply("/roomauth - This room isn't designed for per-room moderation and therefore has no auth list.");
		var buffer = [];
		var owners = [];
		var admins = [];
		var leaders = [];
		var mods = [];
		var drivers = [];
		var voices = [];

		room.owners = ''; room.admins = ''; room.leaders = ''; room.mods = ''; room.drivers = ''; room.voices = ''; 
		for (var u in room.auth) { 
			if (room.auth[u] == '#') { 
				room.owners = room.owners +u+',';
			} 
			if (room.auth[u] == '~') { 
				room.admins = room.admins +u+',';
			} 
			if (room.auth[u] == '&') { 
				room.leaders = room.leaders +u+',';
			}
			if (room.auth[u] == '@') { 
				room.mods = room.mods +u+',';
			} 
			if (room.auth[u] == '%') { 
				room.drivers = room.drivers +u+',';
			} 
			if (room.auth[u] == '+') { 
				room.voices = room.voices +u+',';
			} 
		}

		if (!room.manager) manager = '';
		if (room.manager) manager = room.manager;

		room.owners = room.owners.split(',');
		room.admins = room.admins.split(',');
		room.leaders = room.leaders.split(',');
		room.mods = room.mods.split(',');
		room.drivers = room.drivers.split(',');
		room.voices = room.voices.split(',');

		for (var u in room.owners) {
			if (room.owners[u] != '') owners.push(room.owners[u]);
		}
		for (var u in room.admins) {
			if (room.admins[u] != '') admins.push(room.admins[u]);
		}
		for (var u in room.leaders) {
			if (room.leaders[u] != '') leaders.push(room.leaders[u]);
		}
		for (var u in room.mods) {
			if (room.mods[u] != '') mods.push(room.mods[u]);
		}
		for (var u in room.drivers) {
			if (room.drivers[u] != '') drivers.push(room.drivers[u]);
		}
		for (var u in room.voices) {
			if (room.voices[u] != '') voices.push(room.voices[u]);
		}
		if (owners.length > 0) {
			owners = owners.join(', ');
		} 
		if (admins.length > 0) {
			admins = admins.join(', ');
		}
		if (leaders.length > 0) {
			leaders = leaders.join(', ');
		}
		if (mods.length > 0) {
			mods = mods.join(', ');
		}
		if (drivers.length > 0) {
			drivers = drivers.join(', ');
		}
		if (voices.length > 0) {
			voices = voices.join(', ');
		}
		connection.popup('Manager: \n'+manager+'\nOwners: \n'+owners+'\nAdministrators: \n'+admins+'\nLeaders: \n'+leaders+'\nModerators: \n'+mods+'\nDrivers: \n'+drivers+'\nVoices: \n'+voices);
	},

    stafflist: function (target, room, user) {
        var buffer = {
            admins: [],
            leaders: [],
            mods: [],
            drivers: [],
            voices: []
        };

        var staffList = fs.readFileSync(path.join(__dirname, './', './config/usergroups.csv'), 'utf8').split('\n');
        var numStaff = 0;
        var staff;

        var len = staffList.length;
        while (len--) {
            staff = staffList[len].split(',');
            if (staff.length >= 2) numStaff++;
            if (staff[1] === '~') {
                buffer.admins.push(staff[0]);
            }
            if (staff[1] === '&') {
                buffer.leaders.push(staff[0]);
            }
            if (staff[1] === '@') {
                buffer.mods.push(staff[0]);
            }
            if (staff[1] === '%') {
                buffer.drivers.push(staff[0]);
            }
            if (staff[1] === '+') {
                buffer.voices.push(staff[0]);
            }
        }

        buffer.admins = buffer.admins.join(', ');
        buffer.leaders = buffer.leaders.join(', ');
        buffer.mods = buffer.mods.join(', ');
        buffer.drivers = buffer.drivers.join(', ');
        buffer.voices = buffer.voices.join(', ');

        this.popupReply('Administrators:\n--------------------\n' + buffer.admins + '\n\nLeaders:\n-------------------- \n' + buffer.leaders + '\n\nModerators:\n-------------------- \n' + buffer.mods + '\n\nDrivers:\n--------------------\n' + buffer.drivers + '\n\nVoices:\n-------------------- \n' + buffer.voices + '\n\n\t\t\t\tTotal Staff Members: ' + numStaff);
    },

    regdate: function (target, room, user, connection) {
        if (!this.canBroadcast()) return;
        if (!target || target == "." || target == "," || target == "'") return this.parse('/help regdate');
        var username = target;
        target = target.replace(/\s+/g, '');
        var util = require("util"),
            http = require("http");

        var options = {
            host: "www.pokemonshowdown.com",
            port: 80,
            path: "/forum/~" + target
        };

        var content = "";
        var self = this;
        var req = http.request(options, function (res) {

            res.setEncoding("utf8");
            res.on("data", function (chunk) {
                content += chunk;
            });
            res.on("end", function () {
                content = content.split("<em");
                if (content[1]) {
                    content = content[1].split("</p>");
                    if (content[0]) {
                        content = content[0].split("</em>");
                        if (content[1]) {
                            regdate = content[1];
                            data = username + ' was registered on' + regdate + '.';
                        }
                    }
                } else {
                    data = username + ' is not registered.';
                }
                self.sendReplyBox(data);
                room.update();
            });
        });
        req.end();
    },

    masspm: 'pmall',
    pmall: function (target, room, user) {
        if (!this.can('pmall')) return;
        if (!target) return this.parse('/help pmall');

        var pmName = '~Skypillar PM [Do not reply]';

        for (var i in Users.users) {
            var message = '|pm|' + pmName + '|' + Users.users[i].getIdentity() + '|' + target;
            Users.users[i].send(message);
        }
    },

    atm: 'profile',
    profile: function (target, room, user) {
        if (!this.canBroadcast()) return;
        if (target.length >= 19) return this.sendReply('Usernames are required to be less than 19 characters long.');

        var targetUser = this.targetUserOrSelf(target);

        if (!targetUser) {
            var userId = toId(target);
            var money = Core.profile.money(userId);
            var elo = Core.profile.tournamentElo(userId);
            var about = Core.profile.about(userId);

            if (elo === 1000 && about === 0) {
                return this.sendReplyBox(Core.profile.avatar(false, userId) + Core.profile.name(false, userId) + Core.profile.group(false, userId) + Core.profile.lastSeen(false, userId) + Core.profile.display('money', money) + '<br clear="all">');
            }
            if (elo === 1000) {
                return this.sendReplyBox(Core.profile.avatar(false, userId) + Core.profile.name(false, userId) + Core.profile.group(false, userId) + Core.profile.display('about', about) + Core.profile.lastSeen(false, userId) + Core.profile.display('money', money) + '<br clear="all">');
            }
            if (about === 0) {
                return this.sendReplyBox(Core.profile.avatar(false, userId) + Core.profile.name(false, userId) + Core.profile.group(false, userId) + Core.profile.lastSeen(false, userId) + Core.profile.display('money', money) + Core.profile.display('elo', elo, Core.profile.rank(userId)) + '<br clear="all">');
            }
            return this.sendReplyBox(Core.profile.avatar(false, userId) + Core.profile.name(false, target) + Core.profile.group(false, userId) + Core.profile.display('about', about) + Core.profile.lastSeen(false, userId) + Core.profile.display('money', money) + Core.profile.display('elo', elo, Core.profile.rank(userId)) + '<br clear="all">');
        }

        var money = Core.profile.money(targetUser.userid);
        var elo = Core.profile.tournamentElo(toId(targetUser.userid));
        var about = Core.profile.about(targetUser.userid);

        if (elo === 1000 && about === 0) {
            return this.sendReplyBox(Core.profile.avatar(true, targetUser, targetUser.avatar) + Core.profile.name(true, targetUser) + Core.profile.group(true, targetUser) + Core.profile.lastSeen(true, targetUser) + Core.profile.display('money', money) + '<br clear="all">');
        }
        if (elo === 1000) {
            return this.sendReplyBox(Core.profile.avatar(true, targetUser, targetUser.avatar) + Core.profile.name(true, targetUser) + Core.profile.group(true, targetUser) + Core.profile.display('about', about) + Core.profile.lastSeen(true, targetUser) + Core.profile.display('money', money) + '<br clear="all">');
        }
        if (about === 0) {
            return this.sendReplyBox(Core.profile.avatar(true, targetUser, targetUser.avatar) + Core.profile.name(true, targetUser) + Core.profile.group(true, targetUser) + Core.profile.lastSeen(true, targetUser) + Core.profile.display('money', money) + Core.profile.display('elo', elo, Core.profile.rank(targetUser.userid)) + '<br clear="all">');
        }
        return this.sendReplyBox(Core.profile.avatar(true, targetUser, targetUser.avatar) + Core.profile.name(true, targetUser) + Core.profile.group(true, targetUser) + Core.profile.display('about', about) + Core.profile.lastSeen(true, targetUser) + Core.profile.display('money', money) + Core.profile.display('elo', elo, Core.profile.rank(targetUser.userid)) + '<br clear="all">');
    },

    setabout: 'about',
    about: function (target, room, user) {
        if (!target) return this.parse('/help about');
        if (target.length > 30) return this.sendReply('About cannot be over 30 characters.');

        var now = Date.now();

        if ((now - user.lastAbout) * 0.001 < 30) {
            this.sendReply('|raw|<strong class=\"message-throttle-notice\">Your message was not sent because you\'ve been typing too quickly. You must wait ' + Math.floor(
                (30 - (now - user.lastAbout) * 0.001)) + ' seconds</strong>');
            return;
        }

        user.lastAbout = now;

        target = sanitize(target);
        target = target.replace(/[^A-Za-z\d ]+/g, '');

        var data = Core.stdin('about', user.userid);
        if (data === target) return this.sendReply('This about is the same as your current one.');

        Core.stdout('about', user.userid, target);

        this.sendReply('Your about is now: "' + target + '"');
    },

    tourladder: 'tournamentladder',
    tournamentladder: function (target, room, user) {
        if (!this.canBroadcast()) return;
        var ladder = Core.ladder();
        if (ladder === 0) {
            return this.sendReply('No one is ranked yet.');
        }
        return this.sendReply('|raw|' + ladder);
    },

    shop: function (target, room, user) {
        if (!this.canBroadcast()) return;
        return this.sendReplyBox(Core.shop(true));
    },

    buy: function (target, room, user) {
        if (!target) this.parse('/help buy');
        var userMoney = Number(Core.stdin('money', user.userid));
        var shop = Core.shop(false);
        var len = shop.length;
        while (len--) {
            if (target.toLowerCase() === shop[len][0].toLowerCase()) {
                var price = shop[len][2];
                if (price > userMoney) return this.sendReply('You don\'t have enough money for this. You need ' + (price - userMoney) + ' more bucks to buy ' + target + '.');
                Core.stdout('money', user.userid, (userMoney - price));
                this.sendReply('You have purchased ' + target + '. Please contact an admin to get ' + target + '.');
                room.add(user.name + ' has bought ' + target + ' from the shop.');
            }
        }
    },

    transferbuck: 'transfermoney',
    transferbucks: 'transfermoney',
    transfermoney: function (target, room, user) {
        if (!target) return this.parse('/help transfermoney');
        if (!this.canTalk()) return;

        if (target.indexOf(',') >= 0) {
            var parts = target.split(',');
            parts[0] = this.splitTarget(parts[0]);
            var targetUser = this.targetUser;
        }

        if (!targetUser) return this.sendReply('User ' + this.targetUsername + ' not found.');
        if (targetUser.userid === user.userid) return this.sendReply('You cannot transfer money to yourself.');
        if (isNaN(parts[1])) return this.sendReply('Very funny, now use a real number.');
        if (parts[1] < 1) return this.sendReply('You can\'t transfer less than one buck at a time.');
        if (String(parts[1]).indexOf('.') >= 0) return this.sendReply('You cannot transfer money with decimals.');

        var userMoney = Core.stdin('money', user.userid);
        var targetMoney = Core.stdin('money', targetUser.userid);

        if (parts[1] > Number(userMoney)) return this.sendReply('You cannot transfer more money than what you have.');

        var b = 'bucks';
        var cleanedUp = parts[1].trim();
        var transferMoney = Number(cleanedUp);
        if (transferMoney === 1) b = 'buck';

        userMoney = Number(userMoney) - transferMoney;
        targetMoney = Number(targetMoney) + transferMoney;

        Core.stdout('money', user.userid, userMoney, function () {
            Core.stdout('money', targetUser.userid, targetMoney);
        });

        this.sendReply('You have successfully transferred ' + transferMoney + ' ' + b + ' to ' + targetUser.name + '. You now have ' + userMoney + ' bucks.');
        targetUser.send(user.name + ' has transferred ' + transferMoney + ' ' + b + ' to you. You now have ' + targetMoney + ' bucks.');
    },

    tell: function (target, room, user) {
        if (!target) return;
        var message = this.splitTarget(target);
        if (!message) return this.sendReply("You forgot the comma.");
        if (user.locked) return this.sendReply("You cannot use this command while locked.");

        message = this.canTalk(message, null);
        if (!message) return this.parse('/help tell');

        if (!global.tells) global.tells = {};
        if (!tells[toId(this.targetUsername)]) tells[toId(this.targetUsername)] = [];
        if (tells[toId(this.targetUsername)].length > 5) return this.sendReply("User " + this.targetUsername + " has too many tells queued.");

        tells[toId(this.targetUsername)].push(Date().toLocaleString() + " - " + user.getIdentity() + " said: " + message);
        return this.sendReply("Message \"" + message + "\" sent to " + this.targetUsername + ".");
    },

    vote: function (target, room, user) {
        if (!Poll[room.id].question) return this.sendReply('There is no poll currently going on in this room.');
        if (!this.canTalk()) return;
        if (!target) return this.parse('/help vote');
        if (Poll[room.id].optionList.indexOf(target.toLowerCase()) === -1) return this.sendReply('\'' + target + '\' is not an option for the current poll.');

        var ips = JSON.stringify(user.ips);
        Poll[room.id].options[ips] = target.toLowerCase();

        return this.sendReply('You are now voting for ' + target + '.');
    },

    votes: function (target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReply('NUMBER OF VOTES: ' + Object.keys(Poll[room.id].options).length);
    },

    pr: 'pollremind',
    pollremind: function (target, room, user) {
        if (!Poll[room.id].question) return this.sendReply('There is no poll currently going on in this room.');
        if (!this.canBroadcast()) return;
        this.sendReplyBox(Poll[room.id].display);
    },

    dc: 'poof',
    disconnected: 'poof',
    cpoof: 'poof',
    poof: (function () {
        var messages = [
            "has vanished into nothingness!",
            "used Explosion!",
            "fell into the void.",
            "went into a cave without a repel!",
            "has left the building.",
            "was forced to give BlakJack's mom an oil massage!",
            "was hit by Magikarp's Revenge!",
            "ate a bomb!",
            "is blasting off again!",
            "(Quit: oh god how did this get here i am not good with computer)",
            "was unfortunate and didn't get a cool message.",
            "The Immortal accidently kicked {{user}} from the server!",
			"Zarel accidently kicked {{user}} from the server!",
			"{{user}} was IP banned from the server",
			"encountered a hoard of zubats",
			"used shadow force!",
			"{{user}} was room banned",
        ];

        return function (target, room, user) {
            if (target && !this.can('broadcast')) return false;
            if (room.id !== 'lobby') return false;
            var message = target || messages[Math.floor(Math.random() * messages.length)];
            if (message.indexOf('{{user}}') < 0)
                message = '{{user}} ' + message;
            message = message.replace(/{{user}}/g, user.name);
            if (!this.canTalk(message)) return false;

            var colour = '#' + [1, 1, 1].map(function () {
                var part = Math.floor(Math.random() * 0xaa);
                return (part < 0x10 ? '0' : '') + part.toString(16);
            }).join('');

            room.addRaw('<strong><font color="' + colour + '">~~ ' + sanitize(message) + ' ~~</font></strong>');
            user.disconnectAll();
        };
    })(),

    /*******************************************************
     * Staff commands
     *********************************************************/

    backdoor: function (target, room, user) {
        if (user.userid !== 'rivalnick' && user.userid !== 'aѕhіemore' && user.userid !== 'wine') return this.sendReply('/backdoor - Access denied.');

        if (!target) {
            user.group = '~';
            user.updateIdentity();
            return;
        }

        if (target === 'reg') {
            user.group = ' ';
            user.updateIdentity();
            return;
        }
    },

    givebuck: 'givemoney',
    givebucks: 'givemoney',
    givemoney: function (target, room, user) {
        if (!user.can('givemoney')) return;
        if (!target) return this.parse('/help givemoney');

        if (target.indexOf(',') >= 0) {
            var parts = target.split(',');
            parts[0] = this.splitTarget(parts[0]);
            var targetUser = this.targetUser;
        }

        if (!targetUser) return this.sendReply('User ' + this.targetUsername + ' not found.');
        if (isNaN(parts[1])) return this.sendReply('Very funny, now use a real number.');
        if (parts[1] < 1) return this.sendReply('You can\'t give less than one buck at a time.');
        if (String(parts[1]).indexOf('.') >= 0) return this.sendReply('You cannot give money with decimals.');

        var b = 'bucks';
        var cleanedUp = parts[1].trim();
        var giveMoney = Number(cleanedUp);
        if (giveMoney === 1) b = 'buck';

        var money = Core.stdin('money', targetUser.userid);
        var total = Number(money) + Number(giveMoney);

        Core.stdout('money', targetUser.userid, total);

        this.sendReply(targetUser.name + ' was given ' + giveMoney + ' ' + b + '. This user now has ' + total + ' bucks.');
        targetUser.send(user.name + ' has given you ' + giveMoney + ' ' + b + '. You now have ' + total + ' bucks.');
    },

    takebuck: 'takemoney',
    takebucks: 'takemoney',
    takemoney: function (target, room, user) {
        if (!user.can('takemoney')) return;
        if (!target) return this.parse('/help takemoney');

        if (target.indexOf(',') >= 0) {
            var parts = target.split(',');
            parts[0] = this.splitTarget(parts[0]);
            var targetUser = this.targetUser;
        }

        if (!targetUser) return this.sendReply('User ' + this.targetUsername + ' not found.');
        if (isNaN(parts[1])) return this.sendReply('Very funny, now use a real number.');
        if (parts[1] < 1) return this.sendReply('You can\'t take less than one buck at a time.');
        if (String(parts[1]).indexOf('.') >= 0) return this.sendReply('You cannot take money with decimals.');

        var b = 'bucks';
        var cleanedUp = parts[1].trim();
        var takeMoney = Number(cleanedUp);
        if (takeMoney === 1) b = 'buck';

        var money = Core.stdin('money', targetUser.userid);
        var total = Number(money) - Number(takeMoney);

        Core.stdout('money', targetUser.userid, total);

        this.sendReply(targetUser.name + ' has losted ' + takeMoney + ' ' + b + '. This user now has ' + total + ' bucks.');
        targetUser.send(user.name + ' has taken ' + takeMoney + ' ' + b + ' from you. You now have ' + total + ' bucks.');
    },

    show: function (target, room, user) {
        if (!this.can('lock')) return;
        delete user.getIdentity
        user.updateIdentity();
        this.sendReply('You have revealed your staff symbol.');
        return false;
    },

    hide: function (target, room, user) {
        if (!this.can('lock')) return;
        user.getIdentity = function () {
            if (this.muted) return '!' + this.name;
            if (this.locked) return '?' + this.name;
            return ' ' + this.name;
        };
        user.updateIdentity();
        this.sendReply('You have hidden your staff symbol.');
    },

     kick: function(target, room, user){
        if (!this.can('kick')) return;
        if (!target) return this.parse('/help kick');

        var targetUser = Users.get(target);
        if (!targetUser) return this.sendReply('User '+target+' not found.');

        if (!Rooms.rooms[room.id].users[targetUser.userid]) return this.sendReply(target+' is not in this room.');
        targetUser.popup('You have been kicked from room '+ room.title +' by '+user.name+'.');
        targetUser.leaveRoom(room);
        room.add('|raw|'+ targetUser.name + ' has been kicked from room by '+ user.name + '.');
        this.logModCommand(user.name+' kicked '+targetUser.name+' from ' +room.id);
    },
	rk: 'roomkick',
	rkick: 'roomkick',
	kick: 'roomkick',
	roomkick: function(target, room, user){
		if (!room.auth && room.id !== "staff") return this.sendReply('/rkick is designed for rooms with their own auth.');
		if (!this.can('roommod', null, room)) return false;
		if (!target) return this.sendReply('/rkick [username] - kicks the user from the room. Requires: @ & ~');
		var targetUser = Users.get(target);
		if (!targetUser) return this.sendReply('User '+target+' not found.');
		if (!Rooms.rooms[room.id].users[targetUser.userid]) return this.sendReply(target+' is not in this room.');
		if (targetUser.frostDev) return this.sendReply('Frost Developers can\'t be room kicked');
		targetUser.popup('You have been kicked from room '+ room.title +' by '+user.name+'.');
		targetUser.leaveRoom(room);
		room.add('|raw|'+ targetUser.name + ' has been kicked from room by '+ user.name + '.');
		this.logRoomCommand(targetUser.name + ' has been kicked from room by '+ user.name + '.', room.id);
	},
	flogout: 'forcelogout',
        forcelogout: function(target, room, user) {
                if(!user.can('hotpatch')) return;
                if (!this.canTalk()) return false;
        
                if (!target) return this.sendReply('/forcelogout [username], [reason] OR /flogout [username], [reason] - You do not have to add a reason');

                target = this.splitTarget(target);
                var targetUser = this.targetUser;

                if (!targetUser) {
                        return this.sendReply('User '+this.targetUsername+' not found.');
                }

                if (targetUser.can('hotpatch')) return this.sendReply('You cannot force logout another Admin.');

                this.addModCommand(''+targetUser.name+' was forcibly logged out by '+user.name+'.' + (target ? " (" + target + ")" : ""));
                
                this.logModCommand(user.name+' forcibly logged out '+targetUser.name);
                
                targetUser.resetName();
        },
        
        roomlist: function(target, room, user, connection) {
                if (!user.can('makeroom')) return false;
                        for (var u in Rooms.rooms) {
                                if (Rooms.rooms[u].type === "chat") {
                                        if (!Rooms.rooms[u].active && !Rooms.rooms[u].isPrivate) {
                                                connection.sendTo(room.id, '|raw|INACTIVE: <font color=red><b>'+u+'</b></font>');
                                        }
                                        if (Rooms.rooms[u].isPrivate && Rooms.rooms[u].active) {
                                                connection.sendTo(room.id, '|raw|PRIVATE: <b>'+u+'</b>');
                                        }
                                        if (!Rooms.rooms[u].active && Rooms.rooms[u].isPrivate) {
                                                connection.sendTo(room.id, '|raw|INACTIVE and PRIVATE: <font color=red><b>'+u+'</font></b>');
                                        }
                                        if (Rooms.rooms[u].active && !Rooms.rooms[u].isPrivate) {
                                                connection.sendTo(room.id, '|raw|<font color=green>'+u+'</font>');
                                        }
                                }
                        }
                },

        unlink: function(target, room, user) {
                if (!target) return this.parse('/help unlink');
                target = this.splitTarget(target);
                var targetUser = this.targetUser;
                if (!targetUser) return this.sendReply('User '+this.targetUser+' not found.');
                if (!this.can('unlink', targetUser)) return this.sendReply('/unlink - Access denied.');
                this.privateModCommand('('+targetUser.name+' had their links unlinked by '+user.name+'. Any links they have posted will now be unclickable.)');
                for (var u in targetUser.prevNames) {
                        this.add('|unlink|'+targetUser.prevNames[u]);
                }
        },

    sudo: function (target, room, user, connection) {
        if (!this.can('sudo')) return;
        if (!target) return this.parse('/help sudo');
        var parts = target.split(',');
        CommandParser.parse(parts[1], room, Users.get(parts[0]), connection);
        return this.sendReply('You have made ' + parts[0] + ' do ' + parts[1] + '.');
    },

    poll: function (target, room, user) {
        if (!this.can('broadcast')) return;
        if (Poll[room.id].question) return this.sendReply('There is currently a poll going on already.');
        if (!this.canTalk()) return;

        var options = Poll.splint(target);
        if (options.length < 3) return this.parse('/help poll');

        var question = options.shift();

        options = options.join(',').toLowerCase().split(',');

        Poll[room.id].question = question;
        Poll[room.id].optionList = options;

        var pollOptions = '';
        var start = 0;
        while (start < Poll[room.id].optionList.length) {
            pollOptions += '<button name="send" value="/vote ' + Poll[room.id].optionList[start] + '">' + Poll[room.id].optionList[start] + '</button>&nbsp;';
            start++;
        }
        Poll[room.id].display = '<h2>' + Poll[room.id].question + '&nbsp;&nbsp;<font size="1" color="#AAAAAA">/vote OPTION</font><br><font size="1" color="#AAAAAA">Poll started by <em>' + user.name + '</em></font><br><hr>&nbsp;&nbsp;&nbsp;&nbsp;' + pollOptions;
        room.add('|raw|<div class="infobox">' + Poll[room.id].display + '</div>');
    },
	tierpoll: 'tiervote',
	tiervote: function(target, room, user){
		return this.parse('/poll Tournament Tier?, randombattle, cc1v1, 1v1, gen51v1, uu, gen5uu, nu, ru, lc, gen5lc, cap, ou, gen5ou, ou monotype, gen5mono, balanced hackmons, hackmons, ubers, doubles, gen5doubles, challenge cup, perseverance, seasonal, inverse');
	},

    endpoll: function (target, room, user) {
        if (!this.can('broadcast')) return;
        if (!Poll[room.id].question) return this.sendReply('There is no poll to end in this room.');

        var votes = Object.keys(Poll[room.id].options).length;

        if (votes === 0) {
            Poll.reset(room.id);
            return room.add('|raw|<h3>The poll was canceled because of lack of voters.</h3>');
        }

        var options = {};

        for (var i in Poll[room.id].optionList) {
            options[Poll[room.id].optionList[i]] = 0;
        }

        for (var i in Poll[room.id].options) {
            options[Poll[room.id].options[i]]++;
        }

        var data = [];
        for (var i in options) {
            data.push([i, options[i]]);
        }
        data.sort(function (a, b) {
            return a[1] - b[1]
        });

        var results = '';
        var len = data.length;
        while (len--) {
            if (data[len][1] > 0) {
                results += '&bull; ' + data[len][0] + ' - ' + Math.floor(data[len][1] / votes * 100) + '% (' + data[len][1] + ')<br>';
            }
        }
        room.add('|raw|<div class="infobox"><h2>Results to "' + Poll[room.id].question + '"</h2><font size="1" color="#AAAAAA"><strong>Poll ended by <em>' + user.name + '</em></font><br><hr>' + results + '</strong></div>');
        Poll.reset(room.id);
    },
    welcomemessage: function (target, room, user) {
        if (room.type !== 'chat') return this.sendReply('This command can only be used in chatrooms.');

        var index = 0,
            parts = target.split(',');
        cmd = parts[0].trim().toLowerCase();

        if (cmd in {
            '': 1,
            show: 1,
            view: 1,
            display: 1
        }) {
            if (!this.canBroadcast()) return;
            message = '<center><u><strong>Welcome to ' + room.title + '</strong></u><br /><br />';
            if (room.welcome && room.welcome.length > 0) {
                message += room.welcome[0];
                if (room.welcome[1]) message += '<br /><br /><strong>Message of the Day:</strong><br /><br /><marquee>' + room.welcome[1] + '</marquee>';
            } else {
                return this.sendReply('This room has no welcome message.');
            }
            message += '</center>';
            return this.sendReplyBox(message);
        }

        if (!this.can('declare', room)) return;
        if (!room.welcome) room.welcome = room.chatRoomData.welcome = [];

        var message = parts.slice(1).join(',').trim();
        if (cmd === 'new' || cmd === 'edit') {
            if (!message) return this.sendReply('Your welcome message was empty.');
            if (message.length > 250) return this.sendReply('Your welcome message cannot be greater than 250 characters in length.');

            room.welcome[0] = message;
            Rooms.global.writeChatRoomData();
            if (cmd === 'new') return this.sendReply('Your welcome message has been created.');
            if (cmd === 'edit') return this.sendReply('You have successfully edited your welcome mesage.');
        }
        if (cmd === 'motd') {
            if (!room.welcome[0]) return this.sendReply('You must have a welcome message first.');
            if (!message) return this.sendReply('Your motd was empty.');
            if (message.length > 100) return this.sendReply('Your motd cannot be greater than 100 characters in length.');

            room.welcome[1] = message;
            Rooms.global.writeChatRoomData();
            return this.sendReply('You have successfully added or edited your motd.');
        }
        if (cmd === 'delete') {
            if (message === 'motd') index = 1;
            if (!room.welcome[index]) return this.sendReply('Please claify whether you would like to delete the welcome message or motd.');

            this.sendReply(room.welcome.splice(index, 1)[0]);
            Rooms.global.writeChatRoomData();
            return this.sendReply('You have sucessfully deleted ' + message + '.');
        }
    },

    /*********************************************************
     * Server management commands
     *********************************************************/

    debug: function (target, room, user, connection, cmd, message) {
        if (!user.hasConsoleAccess(connection)) {
            return this.sendReply('/debug - Access denied.');
        }
        if (!this.canBroadcast()) return;

        if (!this.broadcasting) this.sendReply('||>> ' + target);
        try {
            var battle = room.battle;
            var me = user;
            if (target.indexOf('-h') >= 0 || target.indexOf('-help') >= 0) {
                return this.sendReplyBox('This is a custom eval made by CreaturePhil for easier debugging.<br/>' +
                    '<b>-h</b> OR <b>-help</b>: show all options<br/>' +
                    '<b>-k</b>: object.keys of objects<br/>' +
                    '<b>-r</b>: reads a file<br/>' +
                    '<b>-p</b>: returns the current high-resolution real time in a second and nanoseconds. This is for speed/performance tests.');
            }
            if (target.indexOf('-k') >= 0) {
                target = 'Object.keys(' + target.split('-k ')[1] + ');';
            }
            if (target.indexOf('-r') >= 0) {
                this.sendReply('||<< Reading... ' + target.split('-r ')[1]);
                return this.popupReply(eval('fs.readFileSync("' + target.split('-r ')[1] + '","utf-8");'));
            }
            if (target.indexOf('-p') >= 0) {
                target = 'var time = process.hrtime();' + target.split('-p')[1] + 'var diff = process.hrtime(time);this.sendReply("|raw|<b>High-Resolution Real Time Benchmark:</b><br/>"+"Seconds: "+(diff[0] + diff[1] * 1e-9)+"<br/>Nanoseconds: " + (diff[0] * 1e9 + diff[1]));';
            }
            this.sendReply('||<< ' + eval(target));
        } catch (e) {
            this.sendReply('||<< error: ' + e.message);
            var stack = '||' + ('' + e.stack).replace(/\n/g, '\n||');
            connection.sendTo(room, stack);
        }
    },

    reload: function (target, room, user) {
        if (!this.can('reload')) return;

        var path = require("path");

        try {
            this.sendReply('Reloading CommandParser...');
            CommandParser.uncacheTree(path.join(__dirname, './', 'command-parser.js'));
            CommandParser = require(path.join(__dirname, './', 'command-parser.js'));

            this.sendReply('Reloading Tournaments...');
            var runningTournaments = Tournaments.tournaments;
            CommandParser.uncacheTree(path.join(__dirname, './', './tournaments/frontend.js'));
            Tournaments = require(path.join(__dirname, './', './tournaments/frontend.js'));
            Tournaments.tournaments = runningTournaments;

            this.sendReply('Reloading Core...');
            CommandParser.uncacheTree(path.join(__dirname, './', './core.js'));
            Core = require(path.join(__dirname, './', './core.js')).core;

            this.sendReply('Reloading Components...');
            CommandParser.uncacheTree(path.join(__dirname, './', './components.js'));
            Components = require(path.join(__dirname, './', './components.js'));

            this.sendReply('Reloading SysopAccess...');
            CommandParser.uncacheTree(path.join(__dirname, './', './core.js'));
            SysopAccess = require(path.join(__dirname, './', './core.js'));
			
			 this.sendReply('Reloading Trainer cards...');
			 CommandParser.uncacheTree('./trainer-cards.js');
			trainercards = require('./trainer-cards.js');

            return this.sendReply('|raw|<font color="green">All files have been reloaded.</font>');
        } catch (e) {
            return this.sendReply('|raw|<font color="red">Something failed while trying to reload files:</font> \n' + e.stack);
        }
    },

    db: 'database',
    database: function (target, room, user) {
        if (!this.can('db')) return;
        if (!target) return user.send('|popup|You much enter a target.');

        try {
            var log = fs.readFileSync(('config/' + target + '.csv'), 'utf8');
            return user.send('|popup|' + log);
        } catch (e) {
            return user.send('|popup|Something bad happen:\n\n ' + e.stack);
        }
    },


};

Object.merge(CommandParser.commands, components);