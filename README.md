# DreamerDog-V2
This is the new code of DreamerDog (AutoModerator excluded), everything is written from scratch again.

DreamerDog is written for the official Discord of the Youtuber HaiX, so lots of code is for that specific server.

What's new?
 - Upgraded to DiscordJS V12.
 - Added playing music from Youtube
 - Command handler, rather than using a single file for the program.
 - Thanks to the command handler, existing commands can be reloaded without needing to restart the bot.
 - Command cooldowns.
 - Permissions are now handled once in the index.js, rather than hardcoding permissions over and over again for every command.
 - Added support for command aliases.
 - Added an advanced help command that automatically adds new commands.
 - Warnings are now handled by - and stored in the database, adding features like auto-unwarn, giving warn roles back on rejoin.
 - Image fun commands.
