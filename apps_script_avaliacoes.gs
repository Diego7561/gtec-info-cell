// GTEC Info Cell - Avaliações salvas no Google Planilhas
// Cole este código em: Planilha > Extensões > Apps Script

const ABA = 'Avaliacoes';

function getAba() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(ABA);
  if (!sh) {
    sh = ss.insertSheet(ABA);
    sh.appendRow(['Data', 'Nome', 'Nota', 'Comentario', 'Aprovado']);
  }
  return sh;
}

function saida(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Recebe uma nova avaliação (fica como "NAO" até você aprovar)
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.site) return saida({ ok: true });            // campo-armadilha anti-robô
    const nome = String(d.nome || '').trim().slice(0, 60);
    const comentario = String(d.comentario || '').trim().slice(0, 500);
    const nota = Math.min(5, Math.max(1, parseInt(d.nota) || 5));
    if (!nome || !comentario) return saida({ ok: false });
    getAba().appendRow([new Date(), nome, nota, comentario, 'NAO']);
    return saida({ ok: true });
  } catch (err) {
    return saida({ ok: false });
  }
}

// Devolve ao site só as avaliações aprovadas (Aprovado = SIM), as mais novas primeiro
function doGet() {
  const linhas = getAba().getDataRange().getValues().slice(1)
    .filter(r => String(r[4]).trim().toUpperCase() === 'SIM')
    .map(r => ({ data: r[0], nome: r[1], nota: r[2], comentario: r[3] }))
    .reverse()
    .slice(0, 30);
  return saida(linhas);
}
