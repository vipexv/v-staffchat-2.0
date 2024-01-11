RegisterNetEvent("UIMessage", function(action, data)
  UIMessage(action, data)
end)

RegisterNetEvent("staffchat:client:admins", function(data)
  if not data then
    return Debug("[staffchat:client:admins] Event was called but the first param null.")
  end

  Debug("[staffchat:client:admins] Data param:", json.encode(data))

  UIMessage("staffchat:nui:admins", data)
end)

RegisterNetEvent("staffchat:client:firemessage", function(data)
  if not data then
    return Debug("[staffchat:client:firemessage] Event was called but data parm is null.")
  end

  Debug("[staffchat:client:firemessage] data param: ", json.encode(data))
  UIMessage("staffchat:nui:firemessage", data)
end)

RegisterNetEvent("staffchat:client:permissions", function(data)
  if not data then
    return Debug("[staffchat:client:permissions] Event triggered, but the first param is null.")
  end

  UIMessage("staffchat:nui:sourcedata", data)

  PlayerData = data
end)
