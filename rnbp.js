const { resolve, basename } = require('path')
const { fs } = require('mz')
const invariant = require('invariant')
const DMP = require('diff-match-patch')

const findFile = (path) => resolve(__dirname, path)

const checkFileIsExisted = async (path) => {
  invariant(await fs.exists(path), `File：${path} is not found`)
  return fs.readFile(path, 'utf8')
}

exports.generatePatch = async (oldFilePath, newFilePath, opt) => {
  const dmp = new DMP()
  const oldBundle = await checkFileIsExisted(findFile(oldFilePath))
  const newBundle = await checkFileIsExisted(findFile(newFilePath))
  const patchFileName = opt.output || `${basename(oldFilePath)}-${basename(newFilePath)}.patch`
  const patchArr = dmp.patch_make(oldBundle, newBundle)
  await fs.writeFile(resolve(__dirname, patchFileName), dmp.patch_toText(patchArr), 'utf8')
}

exports.patchFile = async (bundleToPatch, patchFilePath, opt) => {
  const dmp = new DMP()
  const bundlePath = findFile(bundleToPatch)
  const bundleContent = await checkFileIsExisted(bundlePath)
  const patchContent = await checkFileIsExisted(findFile(patchFilePath))
  const patchArr = dmp.patch_fromText(patchContent)

  await fs.writeFile(
    opt.replace ? bundlePath : `${bundlePath}.patched`,
    dmp.patch_apply(patchArr, bundleContent),
    'utf8'
  )
}

exports.checkPatchValid = async (patchFilePath) => {
  const dmp = new DMP()
  const patchFullPath = findFile(patchFilePath)
  const patchContent = await fs.readFile(patchFullPath, 'utf8')
  try {
    dmp.patch_fromText(patchContent)
    console.log('Patchfile is valid')
  } catch (e) {
    console.error('Patchfile is not valid for：', e.message)
    process.exit(1)
  }
}
