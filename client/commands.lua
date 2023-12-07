RegisterCommand(Config.CommandName, function()
 if not next(PlayerData) then
  Debug("PlayerData was null, attempting to get player permissions from the server.")
  TriggerServerEvent("staffchat:server:permissions")
  Wait(500)
 end

 if not ScriptState.settingsLoaded then
  local settingsKvp = GetResourceKvpString("staffchat:settings")

  if not settingsKvp then
   return Debug("settings kvp is null, returning.")
  end

  local settings = json.decode(settingsKvp)

  UIMessage("staffchat:nui:settings", settings)
 end


 if not PlayerData.isStaff then
  -- TODO: Notification System
  return Debug("Player is not a staff member.")
 end

 TriggerServerEvent("staffchat:server:admins")

 toggleNuiFrame(true)
 Debug('Show UI frame')
end, false)
