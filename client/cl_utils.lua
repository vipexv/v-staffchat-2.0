function toggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    UIMessage('setVisible', shouldShow)
end

---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
function UIMessage(action, data)
    SendNUIMessage({
        action = action,
        data = data
    })
end

Notify = function(info)
    if not info then
        return Debug("Notify function was called but the first param is null.")
    end

    UIMessage("staffchat:nui:notify", info)
end
