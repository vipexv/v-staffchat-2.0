---@type adminData[]
AdminData = {}

---@param _source string
---@param _oldID string
AddEventHandler("playerJoining", function(_source, _oldID)
  if source <= 0 then
    return Debug("source is nil.")
  end

  local player = CPlayer:new(source)

  if not player then
    return Debug("CPlayer:new method is returning null.")
  end

  if player.isStaff then
    AdminData[tostring(source)] = player
    Debug(player.name, "was added to the AdminData table.")
  end
end)

AddEventHandler("playerDropped", function(_reason)
  if not AdminData[tostring(source)] then
    return Debug("[netEvent:playerDropped] Event was triggered, but the source isn't in the AdminData table.")
  end

  AdminData[tostring(source)] = nil
  Debug("[netEvent:playerDropped] Event was triggered, and the player was removed from the AdminData table.")
end)

SetTimeout(200, function()
  local OnlinePlayers = GetPlayers()

  Debug("AdminData table before looping through all players: ", json.encode(AdminData))

  for i = 1, #OnlinePlayers do
    local playerSource = OnlinePlayers[i]
    local player = CPlayer:new(playerSource)

    if not player then
      return Debug("[timeout:function] CPlayer:new is retruning nil.")
    end

    if player.isStaff then
      Debug("player var:", json.encode(player))
      AdminData[tostring(playerSource)] = player
      Debug(player.name, "was added to the AdminData table.")
    end
  end

  Debug("AdminData table after looping through all of the players: ", json.encode(AdminData))
end)
