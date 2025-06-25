"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Trash2, Edit, Plus, Search, Heart, Recycle, Palette, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Mosaico {
  id: number
  nome: string
  descricao: string
  preco: number
  cores: string[]
  imagem: string
  categoria: string
}

export default function MosaicosPage() {
  const [mosaicos, setMosaicos] = useState<Mosaico[]>([
    {
      id: 1,
      nome: "Mosaico Geométrico Colorido",
      descricao:
        "Um dos nossos trabalhos mais vibrantes! Feito com tampinhas verdes, vermelhas, azuis e laranjas formando padrões geométricos incríveis",
      preco: 18.0,
      cores: ["verde", "vermelho", "azul", "laranja"],
      imagem: "/images/mosaico-geometrico.jpeg",
      categoria: "geometrico",
    },
    {
      id: 2,
      nome: "Yin Yang das Tampinhas",
      descricao:
        "Símbolo do equilíbrio feito com tampinhas pretas e brancas. Uma peça que representa harmonia e sustentabilidade",
      preco: 15.0,
      cores: ["preto", "branco"],
      imagem: "/images/yin-yang.jpeg",
      categoria: "símbolos",
    },
    {
      id: 3,
      nome: "Arte de Parede Multicolor",
      descricao:
        "Mosaico super colorido perfeito para decorar qualquer ambiente! Cada tampinha foi cuidadosamente posicionada",
      preco: 20.0,
      cores: ["multicolor"],
      imagem: "/images/mosaico-parede.jpeg",
      categoria: "decorativo",
    },
  ])

  const [filtroTexto, setFiltroTexto] = useState("")
  const [filtroCategoria, setFiltroCategoria] = useState("")
  const [mosaico, setMosaico] = useState<Partial<Mosaico>>({})
  const [editando, setEditando] = useState(false)
  const [dialogAberto, setDialogAberto] = useState(false)
  const [secaoAtiva, setSecaoAtiva] = useState("home")
  const { toast } = useToast()

  const mosaicosFilterados = mosaicos.filter(
    (m) =>
      m.nome.toLowerCase().includes(filtroTexto.toLowerCase()) &&
      (filtroCategoria === "" || m.categoria === filtroCategoria),
  )

  const categorias = [...new Set(mosaicos.map((m) => m.categoria))]

  const salvarMosaico = () => {
    if (!mosaico.nome || !mosaico.descricao || !mosaico.preco) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    if (editando) {
      setMosaicos((prev) => prev.map((m) => (m.id === mosaico.id ? { ...(mosaico as Mosaico) } : m)))
      toast({
        title: "Sucesso!",
        description: "Mosaico atualizado com sucesso",
      })
    } else {
      const novoMosaico = {
        ...mosaico,
        id: Date.now(),
        cores: mosaico.cores || [],
        imagem: "/placeholder.svg?height=300&width=300",
      } as Mosaico
      setMosaicos((prev) => [...prev, novoMosaico])
      toast({
        title: "Sucesso!",
        description: "Novo mosaico criado com sucesso",
      })
    }

    setMosaico({})
    setEditando(false)
    setDialogAberto(false)
  }

  const editarMosaico = (m: Mosaico) => {
    setMosaico(m)
    setEditando(true)
    setDialogAberto(true)
  }

  const excluirMosaico = (id: number) => {
    setMosaicos((prev) => prev.filter((m) => m.id !== id))
    toast({
      title: "Mosaico removido",
      description: "O mosaico foi excluído com sucesso",
    })
  }

  const novoMosaico = () => {
    setMosaico({})
    setEditando(false)
    setDialogAberto(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 via-yellow-600 to-green-600 bg-clip-text text-transparent">
                ReCriar
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              {["home", "sobre", "galeria", "loja", "doacao", "contato"].map((secao) => (
                <button
                  key={secao}
                  onClick={() => setSecaoAtiva(secao)}
                  className={`capitalize font-medium transition-colors ${
                    secaoAtiva === secao
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  {secao === "doacao" ? "Doação" : secao}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Home Section */}
      {secaoAtiva === "home" && (
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 via-yellow-600 to-green-600 bg-clip-text text-transparent">
                ReCriar: Transformamos Tampinhas em Arte Sustentável
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Cada mosaico é uma obra única, criada com amor e consciência ambiental. Damos nova vida às tampinhas de
                garrafa, transformando-as em belas peças decorativas.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <div className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-full">
                  <Recycle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">100% Reciclado</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-full">
                  <Heart className="w-5 h-5 text-red-600" />
                  <span className="font-medium">Feito com Amor</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-full">
                  <Palette className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Arte Única</span>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                onClick={() => setSecaoAtiva("galeria")}
              >
                Ver Nossa Galeria
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Sobre Section */}
      {secaoAtiva === "sobre" && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8 text-gray-800">Quem Somos 😊</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <p className="text-lg text-gray-600 mb-6">
                    Oi! Somos uma galera de 4 estudantes do 3º ano do ensino médio que se apaixonou pela ideia de
                    transformar "lixo" em arte! 🎨
                  </p>
                  <p className="text-lg text-gray-600 mb-6">
                    Tudo começou quando vimos a quantidade de tampinhas que jogamos fora todo dia. Aí pensamos: "Por que
                    não dar uma nova vida pra elas?" E assim nasceu nosso projeto de mosaicos sustentáveis! ♻️
                  </p>
                  <p className="text-lg text-gray-600 mb-6">
                    Cada peça é feita com muito carinho (e algumas horas de trabalho rs). A gente ama ver como algo que
                    ia pro lixo vira uma obra de arte única!
                  </p>
                  <div className="flex items-center space-x-2 text-green-600">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">Já reciclamos mais de 50 tampinhas! 🎉</span>
                  </div>
                </div>
                <div className="bg-white/60 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Nossa Vibe 🌱</h3>
                  <p className="text-gray-600 mb-4">
                    Queremos mostrar que sustentabilidade pode ser divertida e bonita! Nosso sonho é inspirar outras
                    pessoas (especialmente da nossa idade) a repensarem o que fazem com o "lixo".
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Galeria/Loja Section */}
      {(secaoAtiva === "galeria" || secaoAtiva === "loja") && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800">
                {secaoAtiva === "galeria" ? "Nossa Galeria" : "Loja de Mosaicos"}
              </h2>
              {secaoAtiva === "loja" && (
                <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
                  <DialogTrigger asChild>
                    <Button onClick={novoMosaico} className="bg-gradient-to-r from-green-600 to-blue-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Mosaico
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{editando ? "Editar Mosaico" : "Novo Mosaico"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="nome">Nome *</Label>
                        <Input
                          id="nome"
                          value={mosaico.nome || ""}
                          onChange={(e) => setMosaico((prev) => ({ ...prev, nome: e.target.value }))}
                          placeholder="Nome do mosaico"
                        />
                      </div>
                      <div>
                        <Label htmlFor="descricao">Descrição *</Label>
                        <Textarea
                          id="descricao"
                          value={mosaico.descricao || ""}
                          onChange={(e) => setMosaico((prev) => ({ ...prev, descricao: e.target.value }))}
                          placeholder="Descrição detalhada"
                        />
                      </div>
                      <div>
                        <Label htmlFor="preco">Preço (R$) *</Label>
                        <Input
                          id="preco"
                          type="number"
                          step="0.01"
                          value={mosaico.preco || ""}
                          onChange={(e) =>
                            setMosaico((prev) => ({ ...prev, preco: Number.parseFloat(e.target.value) }))
                          }
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="categoria">Categoria</Label>
                        <Input
                          id="categoria"
                          value={mosaico.categoria || ""}
                          onChange={(e) => setMosaico((prev) => ({ ...prev, categoria: e.target.value }))}
                          placeholder="Ex: animais, natureza, símbolos"
                        />
                      </div>
                      <Button onClick={salvarMosaico} className="w-full">
                        {editando ? "Atualizar" : "Criar"} Mosaico
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar mosaicos..."
                    value={filtroTexto}
                    onChange={(e) => setFiltroTexto(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Todas as categorias</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid de Mosaicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mosaicosFilterados.map((mosaico) => (
                <Card
                  key={mosaico.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={mosaico.imagem || "/placeholder.svg"}
                      alt={mosaico.nome}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-800">{mosaico.nome}</h3>
                      {secaoAtiva === "loja" && (
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => editarMosaico(mosaico)} className="p-2">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => excluirMosaico(mosaico.id)}
                            className="p-2 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{mosaico.descricao}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {mosaico.cores.map((cor, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {cor}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">R$ {mosaico.preco.toFixed(2)}</span>
                      {secaoAtiva === "galeria" && (
                        <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600">
                          Ver Detalhes
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Doação Section */}
      {secaoAtiva === "doacao" && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Doe Suas Tampinhas! 🎯</h2>

              <div className="text-center mb-12">
                <p className="text-xl text-gray-600 mb-6">
                  Quer fazer parte da nossa missão sustentável? Suas tampinhas podem virar arte!
                </p>
                <p className="text-lg text-gray-600">
                  Cada tampinha doada é uma pequena contribuição para um mundo mais sustentável e colorido ✨
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Tipos de tampinhas aceitas */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-green-600 flex items-center">
                      <Recycle className="w-6 h-6 mr-2" />
                      Tampinhas que Aceitamos
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span>Tampinhas de refrigerante (todas as cores)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span>Tampinhas de água (azuis, brancas, verdes)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span>Tampinhas de suco (coloridas)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span>Tampinhas de cerveja (douradas, prateadas)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                        <span>Tampinhas de energético (roxas, pretas)</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700">
                        <strong>Dica:</strong> Quanto mais coloridas e variadas, melhor para nossos mosaicos! 🌈
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Como doar */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-blue-600 flex items-center">
                      <Heart className="w-6 h-6 mr-2" />
                      Como Doar
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm mt-1">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold">Colete as tampinhas</h4>
                          <p className="text-gray-600 text-sm">Junte suas tampinhas limpas (pode ser aos poucos!)</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm mt-1">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold">Entre em contato</h4>
                          <p className="text-gray-600 text-sm">Mande mensagem no WhatsApp ou Instagram</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm mt-1">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold">Combinamos a entrega</h4>
                          <p className="text-gray-600 text-sm">
                            Podemos buscar na sua casa ou combinar um ponto de encontro
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Exemplos visuais */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
                  Veja Como Suas Tampinhas Viram Arte! 🎨
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <img
                      src="/images/mosaico-geometrico.jpeg"
                      alt="Exemplo de mosaico geométrico"
                      className="w-full h-48 object-cover rounded-lg mb-3 shadow-lg"
                    />
                    <p className="text-sm text-gray-600">Padrões geométricos coloridos</p>
                  </div>
                  <div className="text-center">
                    <img
                      src="/images/yin-yang.jpeg"
                      alt="Exemplo de mosaico yin-yang"
                      className="w-full h-48 object-cover rounded-lg mb-3 shadow-lg"
                    />
                    <p className="text-sm text-gray-600">Símbolos e formas especiais</p>
                  </div>
                  <div className="text-center">
                    <img
                      src="/images/mosaico-parede.jpeg"
                      alt="Exemplo de arte de parede"
                      className="w-full h-48 object-cover rounded-lg mb-3 shadow-lg"
                    />
                    <p className="text-sm text-gray-600">Arte decorativa para paredes</p>
                  </div>
                </div>
              </div>

              {/* Contatos para doação */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Vamos Conversar! 💬</h3>
                  <div className="grid md:grid-cols-1 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-600">WhatsApp da Equipe</h4>
                      <p className="text-gray-600">(41) 99597-4567</p>
                      <Button className="bg-green-600 hover:bg-green-700">Chamar no WhatsApp</Button>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white/60 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Horário de atendimento:</strong> Segunda a sexta, 14h às 18h (depois da aula! 📚)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Contato Section */}
      {secaoAtiva === "contato" && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Entre em Contato</h2>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div>
                      <Label htmlFor="nome-contato">Nome</Label>
                      <Input id="nome-contato" placeholder="Seu nome completo" />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="assunto">Assunto</Label>
                      <Input id="assunto" placeholder="Sobre o que você gostaria de falar?" />
                    </div>
                    <div>
                      <Label htmlFor="mensagem">Mensagem</Label>
                      <Textarea
                        id="mensagem"
                        placeholder="Conte-nos sobre seu interesse em nossos mosaicos ou faça uma encomenda personalizada..."
                        rows={5}
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600">Enviar Mensagem</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full flex items-center justify-center">
              <Palette className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">ReCriar</span>
          </div>
          <p className="text-gray-400">
            Transformando tampinhas em arte sustentável • Feito com ❤️ para o meio ambiente
          </p>
        </div>
      </footer>
    </div>
  )
}
