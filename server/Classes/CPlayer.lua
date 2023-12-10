CPlayer = {}

function CPlayer:new(playerSource)
        if not playerSource then return Debug("CPlayer:new function was called, but the first param is null.") end
        local player = {
                id = playerSource,
                name = GetPlayerName(playerSource),
                isStaff = IsPlayerAceAllowed(playerSource, Config.AcePerm)
        }
        self.__index = self
        setmetatable(player, self)
        return player
end
