RegisterNetEvent("staffchat:server:admins", function()
  if not source then
    return Debug("[staffchat:server:admins] Event was called but source is nil.")
  end

  if not AdminData[tostring(source)] then
    -- TODO: Notification system.
    return Debug("[netEvent:staffchat:server:admins] Player is not a staff member.")
  end

  TriggerClientEvent("staffchat:client:admins", source, AdminData)
end)

---@param data messageInfo
RegisterNetEvent("staffchat:server:firemessage", function(data)
  if not source or not AdminData[tostring(source)] then
    return Debug("source is nil or the player isn't a staff member.")
  end

  if not next(data) then
    return Debug("[netEvent:staffchat:server:firemessage] Event was called, but the first param is null/missing.")
  end


  data.adminData = AdminData[tostring(source)]

  Debug("[netEvent:staffchat:server:firemessage] Data: ", json.encode(data))

  for _, v in pairs(AdminData) do
    ---@diagnostic disable-next-line: param-type-mismatch
    TriggerClientEvent("staffchat:client:firemessage", v.id, data)
  end
end)


RegisterNetEvent("staffchat:server:permissions", function()
  if not AdminData[tostring(source)] then
    Debug("[netEvent:staffchat:server:permissions] Player is not staff.")

    -- Not the best, but it works.

    local exData = {
      id = source,
      name = GetPlayerName(source),
      isStaff = false
    }

    TriggerClientEvent("staffchat:client:permissions", source, exData)
    return
  end

  Debug("[netEvent:staffchat:server:permissions] AdminData[tostring(source)]:", json.encode(AdminData[tostring(source)]))
  TriggerClientEvent("staffchat:client:permissions", source, AdminData[tostring(source)])
end)
