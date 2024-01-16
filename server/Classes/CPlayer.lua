CPlayer = {}

function CPlayer:new(playerSource)
        if not playerSource then return Debug("CPlayer:new function was called, but the first param is null.") end

        isStaff = false
        local discordId = GetDiscordID(playerSource)
        local playerName = GetPlayerName(playerSource)

        if Config.UseDiscordRestAPI then
                local discordRoles = GetDiscordRoles(discordId, playerSource)
                if discordRoles then
                        for i = 1, #discordRoles do
                                local discordRoleId = discordRoles[i]
                                if Config.RoleIDs[discordRoleId] then
                                        Debug("(DiscordRestAPI) Staff Member found through their role ID: ",
                                                discordRoleId)
                                        isStaff = true
                                end
                        end
                end
        else
                isStaff = IsPlayerAceAllowed(playerSource, Config.AcePerm)
                if IsPlayerAceAllowed(playerSource, Config.AcePerm) then
                        Debug("(ACEPerms) Staff Member found through their ace perm: ", Config.AcePerm)
                end
        end

        local player = {
                id = playerSource,
                name = playerName,
                isStaff = isStaff
        }
        self.__index = self
        setmetatable(player, self)
        return player
end

--
