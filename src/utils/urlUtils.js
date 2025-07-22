/**
 * Utility function to extract and parse URL parameters
 * @returns {Object} Object containing name and message from URL params
 */
export const getUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search)
  
  // Get name parameter, default to 'Friend'
  const name = urlParams.get('name') || 'Friend'
  
  // Get message parameter, default to 'Happy Birthday!'
  const message = urlParams.get('msg') || urlParams.get('message') || 'Happy Birthday!'
  
  // Decode URI components to handle special characters
  return {
    name: decodeURIComponent(name).trim(),
    message: decodeURIComponent(message).trim()
  }
}

/**
 * Generate a shareable URL with custom name and message
 * @param {string} name - Recipient's name
 * @param {string} message - Custom birthday message
 * @returns {string} Complete URL with parameters
 */
export const generateShareableUrl = (name, message) => {
  const baseUrl = window.location.origin + window.location.pathname
  const params = new URLSearchParams()
  
  if (name && name.trim() !== '') {
    params.append('name', name.trim())
  }
  
  if (message && message.trim() !== '') {
    params.append('msg', message.trim())
  }
  
  return `${baseUrl}?${params.toString()}`
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const success = document.execCommand('copy')
      textArea.remove()
      return success
    }
  } catch (err) {
    console.error('Failed to copy text: ', err)
    return false
  }
}
