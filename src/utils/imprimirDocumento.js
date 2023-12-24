import estilosDocumentosImpresion from './estilosDocumentosImpresion'

export default function () {
  this.imprimirCampo = true
  const printContents = this.$refs.imp1.innerHTML
  const w = window.open('', '_blank', 'width=800,height=800')
  w.document.write(printContents)
  w.document.head.innerHTML = estilosDocumentosImpresion
  w.document.close()
  w.focus()
  w.print()
  // w.close()
  this.imprimirCampo = false
}
