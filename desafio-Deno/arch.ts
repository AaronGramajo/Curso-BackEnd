const denoFile = await DelayNode.open('./text.txt', {read: true})

await denoFile.copy(denoFile, Deno.stdout)

denoFile.close()