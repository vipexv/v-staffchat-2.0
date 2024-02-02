fx_version "cerulean"
lua54 'yes'
game 'gta5'

author 'vipex [Discord: vipex.v]'
description 'Advanced NUI Based FiveM StaffChat'
ui_page 'web/dist/index.html'

shared_scripts {
	"config.lua",
	"shared/utils.lua",
}

client_scripts {
	"client/cl_utils.lua",
	"client/events.lua",
	"client/nui_callbacks.lua",
	"client/commands.lua",
	"client/core.lua"
}
server_scripts {
	"sv_config.lua",
	"server/sv_utils.lua",
	"server/modules/**/*",
	"server/Classes/**/*",
	"server/core.lua",
	"server/events.lua",
}

files {
	'web/dist/index.html',
	'web/dist/**/*',
}
