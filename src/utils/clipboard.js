import { gp } from '@gp'

function clipboardSuccess(text) {
  gp.$baseMessage(`拷贝${text}成功`, 'success', 'vab-hey-message-success')
}

function clipboardError(text) {
  gp.$baseMessage(`拷贝${text}失败`, 'error', 'vab-hey-message-success')
}

/**
 * @description 复制数据
 * @param text
 */
export default function handleClipboard(text) {
  const { isSupported, copy } = useClipboard()
  if (!isSupported) {
    usePermission('clipboard-write')
  }
  copy(text)
    .then(() => {
      clipboardSuccess(text)
    })
    .catch((err) => {
      console.log(err)
      clipboardError(text)
    })
}
