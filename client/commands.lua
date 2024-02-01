RegisterCommand(Config.CommandName, function()
    if not next(PlayerData) then
        Debug("PlayerData was null, attempting to get player permissions from the server.")
        TriggerServerEvent("staffchat:server:permissions")
        Wait(500)
    end

    if not ScriptState.settingsLoaded then
        local settingsKvp = GetResourceKvpString("staffchat:settings")

        if settingsKvp then
            local settings = json.decode(settingsKvp)
            UIMessage("staffchat:nui:settings", settings)
            Debug("Settings sent to the NUI:", json.encode(settings))
        end

        ScriptState.settingsLoaded = true
    end

    if not PlayerData.isStaff then
        return Notify("Insufficient Permissions!")
    end

    TriggerServerEvent("staffchat:server:admins")

    toggleNuiFrame(true)
    Debug('Show UI frame')
end, false)
