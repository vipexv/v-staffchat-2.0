Config = {
        Debug = true,
        CommandName = "staffchat",
        AcePerm = "vadmin.owner", -- The ACE Permissions that has access to the staff chat and is considered an online staff member, only works if your not using the Discord Rest API Option.
        UseDiscordRestAPI = true, -- Replaces the ACE Permission System with one relying on the Discord REST API where players get their permissions based on their roles, make sure to configure the bot token and guild id in sv_config.lua
        RoleIDs = {               -- Only works if you have the UseDiscordRestAPI enabled and have your bot configured in the sv_config.lua
                ["839129247918194732"] = true
        }
}
