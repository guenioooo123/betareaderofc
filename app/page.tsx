"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Shield,
  Star,
  BookOpen,
  Users,
  Zap,
  ArrowLeft,
  Settings,
  Home,
  Clock,
  RotateCcw,
  X,
  Search,
  Filter,
  ChevronDown,
  Lock,
  Trophy,
  FileText,
  Award,
  ThumbsUp,
  MessageCircle,
  Book,
  Lightbulb,
  Sparkles,
  CheckCircle,
  CreditCard,
  Loader2,
  AlertTriangle,
} from "lucide-react"

export default function BetaReaderLanding() {
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [showPixForm, setShowPixForm] = useState(false)
  const [showActivationScreen, setShowActivationScreen] = useState(false)
  const [isProcessingPix, setIsProcessingPix] = useState(false)

  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [userName, setUserName] = useState("Usuário")
  const [selectedCommitment, setSelectedCommitment] = useState("")
  const [selectedIncome, setSelectedIncome] = useState("")

  const [showBookReading, setShowBookReading] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [showFraudPopup, setShowFraudPopup] = useState(false)
  const [fraudAttemptTime, setFraudAttemptTime] = useState(0)

  const [showQuiz, setShowQuiz] = useState(false)
  const [quizStep, setQuizStep] = useState(1)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [quizAttempts, setQuizAttempts] = useState<Record<number, number>>({})
  const [quizResults, setQuizResults] = useState<Record<number, "correct" | "incorrect" | null>>({})
  const [totalScore, setTotalScore] = useState(0)

  const [showResultsScreen, setShowResultsScreen] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [quizPointsBreakdown, setQuizPointsBreakdown] = useState<
    Array<{ id: number; questionText: string; points: number }>
  >([])
  const [evaluationPointsBreakdown, setEvaluationPointsBreakdown] = useState<
    Array<{ id: number; questionText: string; points: number }>
  >([])

  const [convertedMoney, setConvertedMoney] = useState(0)
  const [dashboardBalance, setDashboardBalance] = useState(0)
  const [bookCompleted, setBookCompleted] = useState(false)

  const [showLibrary, setShowLibrary] = useState(false)
  const [showCommunity, setShowCommunity] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [communityActiveTab, setCommunityActiveTab] = useState("rankings")

  const [totalBooksCount, setTotalBooksCount] = useState(0)
  const [availableBooksCount, setAvailableBooksCount] = useState(0)
  const [completedBooksCount, setCompletedBooksCount] = useState(0)
  const [totalPotentialValue, setTotalPotentialValue] = useState(0)

  // Timer states for activation screen
  const [timeLeft, setTimeLeft] = useState(247) // 04:07 in seconds
  const [vagas, setVagas] = useState(7)

  // Withdrawal form states
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [pixKey, setPixKey] = useState("")
  const [pixType, setPixType] = useState("")

  const generateRandomRating = () => {
    const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)
    const reviews = Math.floor(Math.random() * (500 - 100) + 100)
    return { rating, reviews }
  }

  const [allBooks, setAllBooks] = useState([
    {
      id: 1,
      title: "As Sombras de Eldoria",
      author: "Marina Silvestre",
      price: 95.0,
      status: "available",
      coverImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/horizonte-edEcs5tFip97foMGum8lFkPGiNcA6X.png",
      synopsis:
        "Em um reino onde a magia está desaparecendo, uma jovem escriba descobre um antigo segredo que pode salvar ou destruir tudo o que conhece. Entre dragões adormecidos e profecias esquecidas, Lyra deve escolher entre o poder e a sabedoria.",
      ...generateRandomRating(),
    },
    {
      id: 2,
      title: "Código Vermelho",
      author: "Alexandre Ferreira",
      price: 75.0,
      status: "locked",
      lockReason: "Aguarde ser liberado para sua conta",
      coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/triler-xwnVchMNCuZnO6yiuOtv65bi2mnBYg.png",
      synopsis: "Um hacker descobre uma conspiração que pode derrubar o governo...",
      ...generateRandomRating(),
    },
    {
      id: 3,
      title: "O Jardim das Memórias Perdidas",
      author: "Clara Monteiro",
      price: 125.0,
      status: "locked",
      lockReason: "Aguarde ser liberado para sua conta",
      coverImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silenceeee-xyki3OnKkqWL2stfT6owNmQVA2fF8h.png",
      synopsis: "Uma história tocante sobre amor, perda e a força da memória...",
      ...generateRandomRating(),
    },
    {
      id: 4,
      title: "A Cidade Submersa",
      author: "Lucas Mendes",
      price: 90.0,
      status: "locked",
      lockReason: "Aguarde ser liberado para sua conta",
      coverImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homi%20escuro-DhRJvdYEhTtcrlhSEQaWVWmxBCytJl.png",
      synopsis: "Uma metrópole futurista esconde segredos sombrios sob as ondas...",
      ...generateRandomRating(),
    },
    {
      id: 5,
      title: "O Último Guardião",
      author: "Sofia Almeida",
      price: 60.0,
      status: "locked",
      lockReason: "Aguarde ser liberado para sua conta",
      coverImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4234.jpg-uC0iVcn1Hi0kOHAH4a1YzYN1K3DSP1.jpeg",
      synopsis: "Em um mundo pós-apocalíptico, um guardião solitário protege a última semente da esperança...",
      ...generateRandomRating(),
    },
    {
      id: 6,
      title: "Crônicas do Vento",
      author: "Gabriel Costa",
      price: 110.0,
      status: "locked",
      lockReason: "Aguarde ser liberado para sua conta",
      coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ert-4rHq5BRAV9pD9eTBgv0S4TJczXnLSC.jpeg",
      synopsis: "Uma saga épica de aventura e magia, onde o destino é moldado pelos ventos...",
      ...generateRandomRating(),
    },
  ])

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (showActivationScreen && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [showActivationScreen, timeLeft])

  // Format time as MM:SS
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const validatePixKey = (key: string, type: string) => {
    if (!key || !type) return false

    switch (type) {
      case "cpf":
        // Remove non-digits and check if it's 11 digits
        const cpf = key.replace(/\D/g, "")
        return cpf.length === 11
      case "email":
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(key)
      case "phone":
        // Remove non-digits and check if it's 10 or 11 digits
        const phone = key.replace(/\D/g, "")
        return phone.length === 10 || phone.length === 11
      default:
        return false
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (showBookReading && !showFraudPopup) {
      interval = setInterval(() => {
        setReadingTime((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [showBookReading, showFraudPopup])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get("name") as string
    const password = formData.get("password") as string

    if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres")
      return
    }

    setUserName(name)
    setShowSignupModal(false)
    setShowDashboard(true)
    setShowOnboarding(true)
    setDashboardBalance(0)
    setBookCompleted(false)
    setTotalScore(0)
    setConvertedMoney(0)
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowLoginModal(false)
    setShowDashboard(true)
    setDashboardBalance(0)
    setBookCompleted(false)
    setTotalScore(0)
    setConvertedMoney(0)
  }

  const finishOnboarding = () => {
    setShowOnboarding(false)
  }

  const handlePixConfirmation = () => {
    setIsProcessingPix(true)
    setTimeout(() => {
      setIsProcessingPix(false)
      setShowPixForm(false)
      setShowActivationScreen(true)
    }, 2000)
  }

  const handleActivateAccount = () => {
    // Track the InitiateCheckout event
    if (typeof window !== "undefined" && (window as any).fbq) {
      ;(window as any).fbq("track", "InitiateCheckout")
      console.log("🔥 Evento de Checkout Inicial disparado!")
    }

    // Redirect to the external payment URL
    window.open("https://pay.lirapaybr.com/BJTEeCoG", "_blank")
  }

  const handleFinishReading = () => {
    if (readingTime < 30) {
      setFraudAttemptTime(readingTime)
      setShowFraudPopup(true)
    } else {
      setShowQuiz(true)
      setQuizStep(1)
      setQuizAnswers({})
      setQuizAttempts({})
      setQuizResults({})
    }
  }

  const handleBackToBook = () => {
    setShowFraudPopup(false)
    setReadingTime(0) // Zera o cronômetro
  }

  const quizQuestions = [
    {
      id: 1,
      type: "quiz",
      question: "Qual é o nome da protagonista?",
      points: 30,
      options: ["Lyra", "Elena", "Marina"],
      correct: "Lyra",
    },
    {
      id: 2,
      type: "quiz",
      question: "Qual era o título do manuscrito que ela encontrou?",
      points: 40,
      options: ["As Crônicas Perdidas", "Os Últimos Dias da Era Dourada", "O Livro dos Segredos"],
      correct: "Os Últimos Dias da Era Dourada",
    },
    {
      id: 3,
      type: "quiz",
      question: "Quem é o Grão-Mestre da biblioteca?",
      points: 30,
      options: ["Mestre Aldric", "Mestre Gareth", "Mestre Theron"],
      correct: "Mestre Aldric",
    },
    {
      id: 4,
      type: "evaluation",
      question: "Como você avalia a qualidade da escrita?",
      options: [
        { text: "Excelente - Muito bem escrito", points: 20 },
        { text: "Bom - Escrita satisfatória", points: 10 },
        { text: "Regular - Precisa melhorar", points: 5 },
      ],
    },
    {
      id: 5,
      type: "evaluation",
      question: "O que achou do desenvolvimento da história?",
      options: [
        { text: "Muito envolvente e bem estruturada", points: 20 },
        { text: "Interessante, mas com alguns pontos fracos", points: 15 },
        { text: "Confusa e mal desenvolvida", points: 5 },
      ],
    },
    {
      id: 6,
      type: "evaluation",
      question: "Recomendaria este livro para outros leitores?",
      options: [
        { text: "Sim, definitivamente recomendaria", points: 20 },
        { text: "Talvez, para leitores específicos", points: 10 },
        { text: "Não recomendaria", points: 5 },
      ],
    },
  ]

  const currentQuestion = quizQuestions[quizStep - 1]
  const progress = (quizStep / quizQuestions.length) * 100
  const currentAttempts = quizAttempts[quizStep] || 0
  const currentResult = quizResults[quizStep]

  const handleQuizAnswer = (answer: string) => {
    if (currentQuestion.type === "quiz") {
      if (!quizAnswers[quizStep]) {
        const isCorrect = answer === currentQuestion.correct
        const newAttempts = currentAttempts + 1

        setQuizAnswers((prev) => ({ ...prev, [quizStep]: answer }))
        setQuizAttempts((prev) => ({ ...prev, [quizStep]: newAttempts }))
        setQuizResults((prev) => ({ ...prev, [quizStep]: isCorrect ? "correct" : "incorrect" }))
      }
    } else {
      setQuizAnswers((prev) => ({ ...prev, [quizStep]: answer }))
    }
  }

  const handleTryAgain = () => {
    setQuizAnswers((prev) => ({ ...prev, [quizStep]: "" }))
    setQuizResults((prev) => ({ ...prev, [quizStep]: null }))
  }

  const handleNextQuestion = () => {
    if (quizStep < quizQuestions.length) {
      setQuizStep((prev) => prev + 1)
    } else {
      setIsCalculating(true)
      setTimeout(() => {
        let calculatedScore = 0
        const tempQuizBreakdown: Array<{ id: number; questionText: string; points: number }> = []
        const tempEvaluationBreakdown: Array<{ id: number; questionText: string; points: number }> = []

        quizQuestions.forEach((q) => {
          if (q.type === "quiz") {
            const isCorrect = quizResults[q.id] === "correct"
            const attempts = quizAttempts[q.id] || 0

            let pointsEarned = 0
            if (isCorrect) {
              pointsEarned = q.points
            } else {
              // Desconta 5 pontos por cada tentativa errada
              pointsEarned = Math.max(0, q.points - attempts * 5)
            }

            calculatedScore += pointsEarned
            tempQuizBreakdown.push({ id: q.id, questionText: q.question, points: pointsEarned })
          } else if (q.type === "evaluation") {
            const selectedOptionText = quizAnswers[q.id]
            const selectedOption = q.options.find((opt) => opt.text === selectedOptionText)
            const pointsEarned = selectedOption ? selectedOption.points : 0
            calculatedScore += pointsEarned
            tempEvaluationBreakdown.push({ id: q.id, questionText: q.question, points: pointsEarned })
          }
        })

        const minMoney = 50
        const maxMoney = 95
        const maxPossibleScore = 160
        const convertedValue = minMoney + (calculatedScore / maxPossibleScore) * (maxMoney - minMoney)

        setTotalScore(calculatedScore)
        setQuizPointsBreakdown(tempQuizBreakdown)
        setEvaluationPointsBreakdown(tempEvaluationBreakdown)
        setConvertedMoney(convertedValue)

        setShowQuiz(false)
        setShowBookReading(0)
        setShowResultsScreen(true)
        setIsCalculating(false)
      }, 2000)
    }
  }

  const handlePrevQuestion = () => {
    if (quizStep > 1) {
      setQuizStep((prev) => prev - 1)
    }
  }

  const canProceed = () => {
    if (currentQuestion.type === "evaluation") {
      return !!quizAnswers[quizStep]
    }
    return currentResult === "correct" || currentAttempts >= 3
  }

  const topReaders = [
    {
      id: 1,
      name: "Ana Silva",
      books: 47,
      earnings: 2341,
      avgRating: 4.9,
      profileImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-07-28%20210238-Zu2qEInwp63SpEugnLg9rSrLjL7b0c.png",
      rankIcon: (
        <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
          <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        </div>
      ),
    },
    {
      id: 2,
      name: "Marina Costa",
      books: 42,
      earnings: 2180,
      avgRating: 4.8,
      profileImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-07-28%20210136-6p8jGCC9xXxZn2VLRGZg5ILy8phDTP.png",
      rankIcon: (
        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
          <Trophy className="w-4 h-4 text-gray-500 fill-gray-500" />
        </div>
      ),
    },
    {
      id: 3,
      name: "Carlos Mendes",
      books: 38,
      earnings: 1951,
      avgRating: 4.7,
      profileImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-07-28%20210415-20TSDWNCzlIN2Llue6hBz60fRUO1H3.png",
      rankIcon: (
        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
          <Trophy className="w-4 h-4 text-orange-500 fill-orange-500" />
        </div>
      ),
    },
    {
      id: 4,
      name: "Juliana Lima",
      books: 35,
      earnings: 1820,
      avgRating: 4.6,
      profileImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-07-28%20210209-uLA3Xb70LRyGhcpM4lQLcJKml9i0WT.png",
      rankIcon: (
        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="font-bold text-blue-600 text-sm">4</span>
        </div>
      ),
    },
    {
      id: 5,
      name: "Pedro Santos",
      books: 32,
      earnings: 1750,
      avgRating: 4.5,
      profileImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-07-28%20210254-iYQ0TqMiTmS7485a8cT0HZmqvTLMf3.png",
      rankIcon: (
        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
          <span className="font-bold text-purple-600 text-sm">5</span>
        </div>
      ),
    },
  ]

  const reviewsData = [
    {
      id: 1,
      name: "Ana Silva",
      initials: "AS",
      book: "As Sombras de Eldoria",
      timeAgo: "2 horas atrás",
      reviewText:
        "Uma obra-prima da fantasia brasileira! A construção do mundo é impecável e os personagens são cativantes...",
      likes: 23,
      rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
    },
    {
      id: 2,
      name: "Marina Costa",
      initials: "MC",
      book: "Código Vermelho",
      timeAgo: "5 horas atrás",
      reviewText:
        "Thriller bem construído com reviravoltas surpreendentes. O autor conseguiu manter a tensão do início ao fim...",
      likes: 18,
      rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
    },
    {
      id: 3,
      name: "Carlos Mendes",
      initials: "CM",
      book: "O Jardim das Memórias Perdidas",
      timeAgo: "1 dia atrás",
      reviewText: "Chorei do início ao fim. Uma história tocante sobre amor, perda e a importância das memórias...",
      likes: 31,
      rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
    },
    {
      id: 4,
      name: "Juliana Lima",
      initials: "JL",
      book: "A Noite Eterna",
      timeAgo: "2 dias atrás",
      reviewText: "Terror psicológico bem executado. O autor consegue criar uma atmosfera opressiva que te prende...",
      likes: 15,
      rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
    },
  ]

  const achievementsData = [
    {
      id: 1,
      title: "Primeira Avaliação",
      description: "Complete sua primeira avaliação de livro",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      progress: bookCompleted ? 1 : 0,
      target: 1,
      completed: bookCompleted,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      id: 2,
      title: "Leitor Dedicado",
      description: "Avalie 10 livros",
      icon: <Book className="w-6 h-6 text-gray-600" />,
      progress: completedBooksCount,
      target: 10,
      completed: completedBooksCount >= 10,
    },
    {
      id: 3,
      title: "Crítico Experiente",
      description: "Receba 100 curtidas em suas avaliações",
      icon: <ThumbsUp className="w-6 h-6 text-gray-600" />,
      progress: 0,
      target: 100,
      completed: false,
    },
    {
      id: 4,
      title: "Velocidade da Luz",
      description: "Complete uma avaliação em menos de 5 minutos",
      icon: <Lightbulb className="w-6 h-6 text-gray-600" />,
      progress: 0,
      target: 1,
      completed: false,
    },
    {
      id: 5,
      title: "Perfeccionista",
      description: "Mantenha uma média de 4.5 estrelas (mín. 3 avaliações)",
      icon: <Sparkles className="w-6 h-6 text-gray-600" />,
      progress: 0,
      target: 1,
      completed: false,
    },
  ]

  useEffect(() => {
    const updatedBooks = allBooks.map((book) => {
      if (book.id === 1) {
        return { ...book, status: bookCompleted ? "completed" : "available" }
      }
      return book
    })
    setAllBooks(updatedBooks)

    setTotalBooksCount(updatedBooks.length)
    setAvailableBooksCount(updatedBooks.filter((book) => book.status === "available").length)
    setCompletedBooksCount(updatedBooks.filter((book) => book.status === "completed").length)
    setTotalPotentialValue(updatedBooks.reduce((sum, book) => sum + book.price, 0))
  }, [bookCompleted])

  const readersToShow = [...topReaders]
  if (bookCompleted) {
    readersToShow.push({
      id: 999,
      name: userName,
      books: completedBooksCount,
      earnings: dashboardBalance,
      avgRating: totalScore > 0 ? (totalScore / quizQuestions.length / 10).toFixed(1) : "0.0",
      profileImage: undefined,
      rankIcon: (
        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="font-bold text-orange-600 text-sm">78</span>
        </div>
      ),
    })
  }

  // Parse withdrawal amount to number for calculations
  const withdrawalAmountNumber = Number.parseFloat(withdrawalAmount.replace(",", ".")) || 0

  if (showActivationScreen) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-100 px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-2 -ml-2"
              onClick={() => setShowActivationScreen(false)}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Voltar</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-bold text-lg text-gray-900">Beta Reader</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-600 font-medium text-sm">Olá, {userName}</span>
            </div>
          </div>
        </header>

        <div className="px-4 py-6">
          {/* Balance Section */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-gray-700 mb-4">Saldo Disponível</h1>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-600 mb-1">Saldo Atual</div>
                <div className="text-xl font-bold text-blue-600">
                  R$ {dashboardBalance.toFixed(2).replace(".", ",")}
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-600 mb-1">Valor do Saque</div>
                <div className="text-xl font-bold text-green-600">
                  R$ {withdrawalAmountNumber > 0 ? withdrawalAmountNumber.toFixed(2).replace(".", ",") : "0,00"}
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="bg-orange-100 border border-orange-300 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-orange-700">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-sm">AGUARDANDO ATIVAÇÃO • {formatTimer(timeLeft)}</span>
              </div>
            </div>
          </div>

          {/* Special Offer Section */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white mb-6">
            {/* Header Badge */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm">
                <span>🔥</span>
                <span>ÚLTIMAS VAGAS HOJE</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">OFERTA ESPECIAL</h2>
              <p className="text-lg">
                Ative sua conta com <span className="text-yellow-300 font-bold">75% de desconto</span>
              </p>
            </div>

            {/* Timer */}
            <div className="bg-red-700 rounded-xl p-4 mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Oferta expira em:</span>
                </div>
                <div className="text-4xl font-bold text-yellow-300 mb-2">{formatTimer(timeLeft)}</div>
                <p className="text-sm">Não perca esta oportunidade!</p>
              </div>
            </div>

            {/* Why Fee Section */}
            <div className="bg-red-700 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">?</span>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Por que existe uma taxa?</h3>
                  <p className="text-sm leading-relaxed">
                    Para liberar seu saldo e ativar sua carteira, exigimos uma taxa única para garantir que só pessoas
                    reais recebam os saques via PIX, protegendo o sistema contra robôs e golpes.
                  </p>
                </div>
              </div>
            </div>

            {/* Remaining Spots */}
            <div className="bg-red-700 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Vagas restantes hoje:</span>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-300" />
                  <span className="text-2xl font-bold text-yellow-300">{vagas}</span>
                </div>
              </div>
              <div className="w-full bg-red-800 rounded-full h-2 mb-3">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(vagas / 10) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-300">⚠️</span>
                <span>Após esgotar, a taxa volta para R$ 79,90</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-xl line-through text-red-300">R$ 79,90</span>
                <span className="text-4xl font-bold">R$ 19,99</span>
                <div className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm">75% OFF</div>
              </div>
              <div className="bg-red-700 rounded-xl p-3 mb-6">
                <span className="text-yellow-300 font-bold">💰 Você economiza R$ 59,91</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              className="w-full bg-white text-red-600 hover:bg-gray-100 py-4 text-lg font-bold rounded-xl mb-4 min-h-[56px]"
              onClick={handleActivateAccount}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              ATIVAR CONTA - R$ 19,99
            </Button>

            <div className="text-center text-sm">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Esta oferta é válida apenas hoje e expira em {formatTimer(timeLeft)}</span>
              </div>
            </div>
          </div>

          {/* Investment Return Section */}
          <div className="bg-white rounded-2xl p-6 mb-6">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">💎</span>
                <h3 className="text-xl font-bold text-gray-900">Retorno do Investimento</h3>
              </div>
              <p className="text-gray-600">Veja como seu investimento se multiplica</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold text-red-600 mb-1">R$ 19,99</div>
                <div className="text-xs text-gray-600">Investimento único</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600 mb-1">
                  R$ {withdrawalAmountNumber > 0 ? withdrawalAmountNumber.toFixed(0) : "122"}+
                </div>
                <div className="text-xs text-gray-600">Primeiro saque</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-xl font-bold text-green-600">
                    {withdrawalAmountNumber > 0 ? Math.round((withdrawalAmountNumber / 19.99) * 100) : 650}%
                  </span>
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-xs text-gray-600">de retorno</div>
              </div>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 mb-20">
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="font-bold text-green-600 text-sm">100% Seguro</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="font-bold text-blue-600 text-sm">Protegido</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-purple-600">7</span>
              </div>
              <div className="font-bold text-purple-600 text-sm">Garantia</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showDashboard) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-bold text-lg text-gray-900">Beta Reader</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-600 font-medium text-sm">
                {showWithdraw ? `Olá, ${userName}` : `Saldo: R$ ${dashboardBalance.toFixed(2).replace(".", ",")}`}
              </span>
              <button className="text-gray-600 hover:text-gray-900 p-2">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {!showLibrary && !showCommunity && !showWithdraw && (
          <div className="px-4 py-4">
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Card className="bg-white border-0 shadow-sm rounded-xl">
                <CardContent className="p-4 text-center">
                  <div className="text-xs text-gray-600 mb-1">Saldo</div>
                  <div className="text-xl font-bold text-green-600 mb-3">
                    R$ {dashboardBalance.toFixed(2).replace(".", ",")}
                  </div>
                  <Button
                    className={`w-full text-white text-sm py-3 rounded-lg min-h-[44px] ${
                      dashboardBalance > 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={() => {
                      if (dashboardBalance > 0) {
                        setShowWithdraw(true)
                        setActiveTab("withdraw")
                      }
                    }}
                    disabled={dashboardBalance === 0}
                  >
                    {dashboardBalance > 0 ? "Toque para sacar" : "Sem saldo"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm rounded-xl">
                <CardContent className="p-4 text-center">
                  <div className="text-xs text-gray-600 mb-1">Hoje</div>
                  <div className="text-xl font-bold text-blue-500 mb-3">{completedBooksCount} livros</div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Olá, {userName}!</h1>
              <p className="text-gray-600 text-sm">
                {bookCompleted ? "Você avaliou 1 livro hoje" : "Comece lendo seu primeiro livro para ganhar dinheiro"}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {bookCompleted
                  ? "Parabéns! Você completou sua primeira avaliação"
                  : "Seu primeiro livro está disponível"}
              </h2>

              <div className="space-y-3">
                {allBooks
                  .filter((book) => book.id === 1)
                  .map((book) => (
                    <Card key={book.id} className="bg-white border-0 shadow-sm rounded-xl">
                      <CardContent className="p-4">
                        <div className="flex gap-3 items-start">
                          {book.coverImage && (
                            <div className="flex-shrink-0">
                              <img
                                src={book.coverImage || "/placeholder.svg"}
                                alt={book.title}
                                className="w-14 h-20 object-cover rounded-lg border border-gray-200"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "/placeholder.svg?height=80&width=56&text=Book"
                                }}
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1 text-sm">{book.title}</h3>
                            <p className="text-xs text-gray-600 mb-2">por {book.author}</p>
                            <p className="text-lg font-bold text-green-600">
                              R$ {book.price.toFixed(2).replace(".", ",")}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            {book.status === "completed" ? (
                              <Button
                                className="bg-green-100 text-green-600 px-3 py-2 text-xs cursor-not-allowed rounded-lg min-h-[36px]"
                                disabled
                              >
                                ✅ Concluído
                              </Button>
                            ) : (
                              <Button
                                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 text-xs rounded-lg min-h-[36px]"
                                onClick={() => {
                                  setReadingTime(0)
                                  setShowBookReading(1)
                                }}
                              >
                                Ler e Avaliar
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                {allBooks
                  .filter((book) => book.id !== 1)
                  .slice(0, 2)
                  .map((book) => (
                    <Card key={book.id} className="bg-white border-0 shadow-sm rounded-xl">
                      <CardContent className="p-4">
                        <div className="flex gap-3 items-start">
                          {book.coverImage && (
                            <div className="flex-shrink-0">
                              <img
                                src={book.coverImage || "/placeholder.svg"}
                                alt={book.title}
                                className="w-14 h-20 object-cover rounded-lg border border-gray-200 opacity-50"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "/placeholder.svg?height=80&width=56&text=Book"
                                }}
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-400 mb-1 text-sm">{book.title}</h3>
                            <p className="text-xs text-gray-400 mb-2">por {book.author}</p>
                            <p className="text-lg font-bold text-gray-400 mb-2">
                              R$ {book.price.toFixed(2).replace(".", ",")}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{book.lockReason}</span>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <Button
                              className="bg-gray-300 text-gray-500 px-3 py-2 text-xs cursor-not-allowed rounded-lg min-h-[36px]"
                              disabled
                            >
                              🔒 Bloqueado
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {!bookCompleted && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">💡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Como funciona?</h3>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      Leia o livro "As Sombras de Eldoria" e responda algumas perguntas sobre a história. Você pode
                      ganhar entre R$ 50,00 e R$ 95,00 pela sua primeira avaliação!
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Card className="bg-white border-0 shadow-sm rounded-xl">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-4 h-4 text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Comunidade</h3>
                  <p className="text-xs text-gray-600 mb-3">Rankings e reviews</p>
                  <Button
                    variant="outline"
                    className="w-full text-orange-500 border-orange-500 hover:bg-orange-50 text-xs bg-transparent rounded-lg min-h-[36px]"
                    onClick={() => {
                      setShowCommunity(true)
                      setActiveTab("community")
                      setShowWithdraw(false)
                    }}
                  >
                    📈 Ver Rankings
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm rounded-xl">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Biblioteca</h3>
                  <p className="text-xs text-gray-600 mb-3">Ver biblioteca completa</p>
                  <Button
                    variant="outline"
                    className="w-full text-blue-500 border-blue-500 hover:bg-blue-50 text-xs bg-transparent rounded-lg min-h-[36px]"
                    onClick={() => {
                      setShowLibrary(true)
                      setActiveTab("books")
                      setShowWithdraw(false)
                    }}
                  >
                    📚 Todos os Livros
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {showLibrary && (
          <div className="px-4 py-4">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Biblioteca de Livros</h1>
              <p className="text-gray-600 text-sm">
                Explore nossa coleção completa de livros disponíveis para avaliação
              </p>
            </div>

            <div className="mb-6 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por título ou autor..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
              </div>
              <Button
                variant="outline"
                className="w-full justify-start text-gray-600 border-gray-200 bg-white hover:bg-gray-50 rounded-xl min-h-[48px]"
              >
                <Filter className="w-4 h-4 mr-2" />
                Todos os gêneros
                <ChevronDown className="ml-auto w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Card className="bg-white border-0 shadow-sm rounded-xl">
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-500 mb-1">{totalBooksCount}</div>
                  <div className="text-xs text-gray-600">Total de Livros</div>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-sm rounded-xl">
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-green-500 mb-1">{availableBooksCount}</div>
                  <div className="text-xs text-gray-600">Disponíveis</div>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-sm rounded-xl">
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-orange-500 mb-1">{completedBooksCount}</div>
                  <div className="text-xs text-gray-600">Concluídos</div>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-sm rounded-xl">
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-purple-600 mb-1">
                    R$ {totalPotentialValue.toFixed(2).replace(".", ",")}
                  </div>
                  <div className="text-xs text-gray-600">Valor Total</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3 mb-6">
              {allBooks.map((book) => (
                <Card key={book.id} className="bg-white border-0 shadow-sm rounded-xl">
                  <CardContent className="p-4">
                    <div className="flex gap-3 items-start">
                      {book.coverImage && (
                        <div className="flex-shrink-0">
                          <img
                            src={book.coverImage || "/placeholder.svg"}
                            alt={book.title}
                            className="w-14 h-20 object-cover rounded-lg border border-gray-200"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=80&width=56&text=Book"
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm">{book.title}</h3>
                        <p className="text-xs text-gray-600 mb-2">por {book.author}</p>
                        <p className="text-gray-700 text-xs mb-3 leading-relaxed line-clamp-2">{book.synopsis}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-gray-900">{book.rating}</span>
                          <span className="text-gray-500">({book.reviews})</span>
                        </div>
                        {book.status === "completed" && (
                          <div className="flex items-center gap-2 text-xs text-green-600 mt-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Avaliação concluída</span>
                          </div>
                        )}
                        {book.status === "locked" && (
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{book.lockReason}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-lg font-bold text-green-600 mb-3">
                          R$ {book.price.toFixed(2).replace(".", ",")}
                        </p>
                        {book.status === "completed" ? (
                          <Button
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 text-xs cursor-not-allowed rounded-lg min-h-[36px]"
                            disabled
                          >
                            Concluído
                          </Button>
                        ) : book.status === "available" ? (
                          <Button
                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 text-xs rounded-lg min-h-[36px]"
                            onClick={() => {
                              setReadingTime(0)
                              setShowBookReading(1)
                              setShowLibrary(false)
                            }}
                          >
                            Ler e Avaliar
                          </Button>
                        ) : (
                          <Button
                            className="bg-gray-300 text-gray-500 px-3 py-2 text-xs cursor-not-allowed rounded-lg min-h-[36px]"
                            disabled
                          >
                            <Lock className="w-3 h-3 mr-1" />
                            Bloqueado
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {showCommunity && (
          <div className="px-4 py-4">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Comunidade Beta Reader</h1>
              <p className="text-gray-600 text-sm">
                Conecte-se com outros leitores, veja rankings e conquiste achievements
              </p>
            </div>

            <div className="flex space-x-2 mb-6">
              <Button
                variant="outline"
                className={`flex-1 text-xs rounded-xl min-h-[44px] ${
                  communityActiveTab === "rankings"
                    ? "bg-orange-50 text-orange-600 border-orange-500 hover:bg-orange-100"
                    : "text-gray-600 border-gray-200 bg-white hover:bg-gray-50"
                }`}
                onClick={() => setCommunityActiveTab("rankings")}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Rankings
              </Button>
              <Button
                variant="outline"
                className={`flex-1 text-xs rounded-xl min-h-[44px] ${
                  communityActiveTab === "reviews"
                    ? "bg-orange-50 text-orange-600 border-orange-500 hover:bg-orange-100"
                    : "text-gray-600 border-gray-200 bg-white hover:bg-gray-50"
                }`}
                onClick={() => setCommunityActiveTab("reviews")}
              >
                <FileText className="w-4 h-4 mr-2" />
                Reviews
              </Button>
              <Button
                variant="outline"
                className={`flex-1 text-xs rounded-xl min-h-[44px] ${
                  communityActiveTab === "achievements"
                    ? "bg-orange-50 text-orange-600 border-orange-500 hover:bg-orange-100"
                    : "text-gray-600 border-gray-200 bg-white hover:bg-gray-50"
                }`}
                onClick={() => setCommunityActiveTab("achievements")}
              >
                <Award className="w-4 h-4 mr-2" />
                Conquistas
              </Button>
            </div>

            {communityActiveTab === "rankings" && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Leitores do Mês</h2>
                <div className="space-y-3 mb-6">
                  {readersToShow.map((reader) => (
                    <Card key={reader.id} className="bg-white border-0 shadow-sm rounded-xl">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {reader.profileImage ? (
                            <div className="relative">
                              <img
                                src={reader.profileImage || "/placeholder.svg"}
                                alt={reader.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "/placeholder.svg?height=40&width=40&text=" + reader.name.charAt(0)
                                }}
                              />
                              <div className="absolute -top-0.5 -right-0.5">{reader.rankIcon}</div>
                            </div>
                          ) : (
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-200">
                                <span className="text-gray-700 font-semibold text-sm">{reader.name.charAt(0)}</span>
                              </div>
                              <div className="absolute -top-0.5 -right-0.5">{reader.rankIcon}</div>
                            </div>
                          )}
                          <span className="font-semibold text-gray-900 text-sm">{reader.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <div className="text-center">
                            <span className="font-bold text-blue-600">{reader.books}</span>
                            <div className="text-gray-600">Livros</div>
                          </div>
                          <div className="text-center">
                            <span className="font-bold text-green-600">
                              R$ {reader.earnings.toFixed(0).replace(".", ",")}
                            </span>
                            <div className="text-gray-600">Ganhos</div>
                          </div>
                          <div className="text-center">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 inline-block mr-1" />
                            <span className="font-bold text-gray-900">{reader.avgRating}</span>
                            <div className="text-gray-600">Média</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {communityActiveTab === "reviews" && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Reviews Recentes da Comunidade</h2>
                <div className="space-y-3 mb-6">
                  {reviewsData.map((review) => (
                    <Card key={review.id} className="bg-white border-0 shadow-sm rounded-xl">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold text-xs">
                            {review.initials}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                            <div className="text-xs text-gray-600">
                              avaliou "{review.book}" • {review.timeAgo}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(Number.parseFloat(review.rating))
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4 text-sm">{review.reviewText}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <button className="flex items-center gap-1 hover:text-orange-500 p-2 -ml-2">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{review.likes} pessoas acharam útil</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-orange-500 p-2">
                            <MessageCircle className="w-3 h-3" />
                            <span>Responder</span>
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {communityActiveTab === "achievements" && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Suas Conquistas</h2>
                <div className="space-y-3 mb-6">
                  {achievementsData.map((achievement) => (
                    <Card
                      key={achievement.id}
                      className={`p-4 border-0 shadow-sm rounded-xl ${achievement.completed ? achievement.bgColor : "bg-white"}`}
                    >
                      <CardContent className="p-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              achievement.completed ? "bg-green-100" : "bg-gray-100"
                            }`}
                          >
                            {achievement.icon}
                          </div>
                          <div>
                            <h3
                              className={`font-semibold text-sm ${
                                achievement.completed ? achievement.textColor : "text-gray-900"
                              }`}
                            >
                              {achievement.title}
                            </h3>
                            <p className={`text-xs ${achievement.completed ? achievement.textColor : "text-gray-600"}`}>
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mb-2">Progresso</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${achievement.completed ? "bg-green-500" : "bg-orange-500"}`}
                            style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-right text-xs text-gray-600 mt-1">
                          {achievement.progress}/{achievement.target}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {showWithdraw && !showPixForm && (
          <div className="px-4 py-4 bg-gray-50 min-h-screen">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Carteira</h1>
              <p className="text-gray-600 text-sm">Gerencie seus ganhos e realize saques via PIX</p>
            </div>

            {dashboardBalance > 0 ? (
              <>
                <Card className="bg-gradient-to-br from-green-400 to-green-500 border-0 shadow-lg mb-6 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="text-center text-white mb-6">
                      <div className="text-sm font-medium mb-4">Saldo Disponível</div>
                      <div className="text-4xl font-bold mb-6">R$ {dashboardBalance.toFixed(2).replace(".", ",")}</div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white border-0 py-4 rounded-xl font-medium min-h-[48px]"
                        onClick={() => setShowPixForm(true)}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Sacar via PIX
                      </Button>
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white border-0 py-4 rounded-xl font-medium min-h-[48px]"
                        onClick={() => {
                          setShowWithdraw(false)
                          setShowLibrary(true)
                          setActiveTab("books")
                        }}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Ler Mais Livros
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm mb-6 rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl text-green-500 font-bold">$</span>
                    </div>
                    <div className="text-3xl font-bold text-green-500 mb-3">
                      R$ {dashboardBalance.toFixed(2).replace(".", ",")}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">Total de Ganhos</div>
                    <div className="text-gray-600 text-sm">Valor total ganho avaliando livros</div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-white border-0 shadow-sm mb-6 rounded-2xl">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center min-h-[200px]">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl text-gray-400 font-bold">$</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-400 mb-3">R$ 0,00</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">Sem saldo disponível</div>
                  <div className="text-gray-600 mb-6 text-sm">
                    Complete sua primeira avaliação para começar a ganhar
                  </div>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium min-h-[48px]"
                    onClick={() => {
                      setShowWithdraw(false)
                      setActiveTab("home")
                    }}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Ler Primeiro Livro
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {showPixForm && (
          <div className="px-4 py-4 bg-gray-50 min-h-screen">
            <header className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-2 -ml-2"
                  onClick={() => setShowPixForm(false)}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm">Voltar</span>
                </button>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-medium text-sm">Olá, {userName}</span>
                  <button className="text-gray-600 hover:text-gray-900 p-2">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Carteira</h1>
              <p className="text-gray-600 text-sm">Gerencie seus ganhos e realize saques via PIX</p>
            </header>

            <Card className="bg-white border-0 shadow-sm mb-6 rounded-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-gray-600 mb-2 text-sm">Saldo Disponível</div>
                <div className="text-3xl font-bold text-green-500 mb-4">
                  R$ {dashboardBalance.toFixed(2).replace(".", ",")}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Valor do Saque <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: 25,50"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                />
                <p className="text-xs text-gray-500 mt-1">Valor mínimo: R$ 10,00</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Tipo de Chave PIX <span className="text-red-500">*</span>
                </label>
                <select
                  value={pixType}
                  onChange={(e) => setPixType(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base mb-4"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="cpf">CPF</option>
                  <option value="email">E-mail</option>
                  <option value="phone">Telefone</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Chave PIX <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={
                    pixType === "cpf"
                      ? "000.000.000-00"
                      : pixType === "email"
                        ? "seu@email.com"
                        : pixType === "phone"
                          ? "(00) 00000-0000"
                          : "Selecione o tipo primeiro"
                  }
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                  disabled={!pixType}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {pixType === "cpf" && "Digite apenas números do CPF"}
                  {pixType === "email" && "Digite um e-mail válido"}
                  {pixType === "phone" && "Digite o telefone com DDD"}
                  {!pixType && "Selecione o tipo de chave PIX primeiro"}
                </p>
              </div>

              <Card className="bg-blue-50 border border-blue-200 shadow-sm rounded-xl">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2 text-sm">Informações do Saque</h3>
                      <ul className="text-blue-800 text-xs space-y-1">
                        <li>• Processamento em até 24 horas úteis</li>
                        <li>• Sem taxas para saques via PIX</li>
                        <li>• Valor mínimo: R$ 10,00</li>
                        <li>• Máximo por dia: R$ 1.000,00</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-base font-semibold rounded-xl min-h-[56px]"
                onClick={handlePixConfirmation}
                disabled={
                  isProcessingPix ||
                  !withdrawalAmount ||
                  !pixKey ||
                  !pixType ||
                  withdrawalAmountNumber < 10 ||
                  !validatePixKey(pixKey, pixType)
                }
              >
                {isProcessingPix ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Confirmar Saque de R${" "}
                    {withdrawalAmountNumber > 0 ? withdrawalAmountNumber.toFixed(2).replace(".", ",") : "0,00"}
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-gray-500">Preencha todos os campos obrigatórios</p>
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="grid grid-cols-4 py-2">
            <button
              className={`flex flex-col items-center py-3 px-2 ${
                activeTab === "home" ? "text-orange-500" : "text-gray-400"
              }`}
              onClick={() => {
                setShowDashboard(true)
                setShowLibrary(false)
                setShowCommunity(false)
                setShowWithdraw(false)
                setShowPixForm(false)
                setActiveTab("home")
              }}
            >
              <Home className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button
              className={`flex flex-col items-center py-3 px-2 ${
                activeTab === "books" ? "text-orange-500" : "text-gray-400"
              }`}
              onClick={() => {
                setShowDashboard(true)
                setShowLibrary(true)
                setShowCommunity(false)
                setShowWithdraw(false)
                setShowPixForm(false)
                setActiveTab("books")
              }}
            >
              <BookOpen className="w-5 h-5 mb-1" />
              <span className="text-xs">Livros</span>
            </button>
            <button
              className={`flex flex-col items-center py-3 px-2 ${
                activeTab === "community" ? "text-orange-500" : "text-gray-400"
              }`}
              onClick={() => {
                setShowDashboard(true)
                setShowLibrary(false)
                setShowCommunity(true)
                setShowWithdraw(false)
                setShowPixForm(false)
                setActiveTab("community")
                setCommunityActiveTab("rankings")
              }}
            >
              <Users className="w-5 h-5 mb-1" />
              <span className="text-xs">Comunidade</span>
            </button>
            <button
              className={`flex flex-col items-center py-3 px-2 ${
                activeTab === "withdraw" ? "text-orange-500" : "text-gray-400"
              }`}
              onClick={() => {
                setShowDashboard(true)
                setShowLibrary(false)
                setShowCommunity(false)
                setShowWithdraw(true)
                setShowPixForm(false)
                setActiveTab("withdraw")
              }}
            >
              <Zap className="w-5 h-5 mb-1" />
              <span className="text-xs">Saque</span>
            </button>
          </div>
        </div>

        {showOnboarding && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
              {onboardingStep === 1 && (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">👋</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo, {userName}!</h2>
                    <p className="text-gray-600 text-sm">Vamos configurar seu perfil de beta reader</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Sua intenção é se comprometer e realmente trabalhar como um beta-reader?
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">Queremos entender seu nível de dedicação</p>

                    <div className="space-y-3">
                      <button
                        className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                          selectedCommitment === "committed"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedCommitment("committed")}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                              selectedCommitment === "committed" ? "border-green-500 bg-green-500" : "border-gray-300"
                            }`}
                          >
                            {selectedCommitment === "committed" && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Sim, estou comprometido(a)</div>
                            <div className="text-sm text-gray-600">Quero trabalhar seriamente como beta reader</div>
                          </div>
                        </div>
                      </button>

                      <button
                        className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                          selectedCommitment === "curious"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedCommitment("curious")}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                              selectedCommitment === "curious" ? "border-green-500 bg-green-500" : "border-gray-300"
                            }`}
                          >
                            {selectedCommitment === "curious" && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Não, apenas curiosidade</div>
                            <div className="text-sm text-gray-600">Quero explorar a plataforma primeiro</div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-semibold rounded-xl min-h-[56px]"
                    onClick={() => setOnboardingStep(2)}
                    disabled={!selectedCommitment}
                  >
                    Continuar
                  </Button>
                </>
              )}

              {onboardingStep === 2 && (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💰</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo, {userName}!</h2>
                    <p className="text-gray-600 text-sm">Vamos configurar seu perfil de beta reader</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Qual sua faixa de renda mensal?</h3>
                    <p className="text-gray-600 text-sm mb-4">Isso nos ajuda a personalizar sua experiência</p>

                    <div className="space-y-3">
                      {[
                        { value: "1k-10k", label: "R$ 1.000 - R$ 10.000" },
                        { value: "10k-50k", label: "R$ 10.000 - R$ 50.000" },
                        { value: "100k+", label: "R$ 100.000+" },
                        { value: "unemployed", label: "Desempregado(a)" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                            selectedIncome === option.value
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedIncome(option.value)}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedIncome === option.value ? "border-green-500 bg-green-500" : "border-gray-300"
                              }`}
                            >
                              {selectedIncome === option.value && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="font-medium text-gray-900">{option.label}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-semibold rounded-xl min-h-[56px]"
                    onClick={finishOnboarding}
                    disabled={!selectedIncome}
                  >
                    Finalizar
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {showBookReading > 0 && (
          <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
            <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0">
              <div className="flex items-center justify-between">
                <button
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-2 -ml-2"
                  onClick={() => setShowBookReading(0)}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm">Voltar</span>
                </button>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono text-sm">{formatTime(readingTime)}</span>
                </div>
              </div>
            </header>

            <div className="px-4 py-6 max-w-4xl mx-auto pb-20">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">As Sombras de Eldoria</h1>
                <p className="text-gray-600 text-sm">por Marina Silvestre</p>
              </div>

              <Card className="bg-white border-0 shadow-sm mb-6 rounded-xl">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Sinopse</h2>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Em um reino onde a magia está desaparecendo, uma jovem escriba descobre um antigo segredo que pode
                    salvar ou destruir tudo o que conhece. Entre dragões adormecidos e profecias esquecidas, Lyra deve
                    escolher entre o poder e a sabedoria.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm mb-8 rounded-xl">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Conteúdo do Livro</h2>
                  <div className="text-gray-700 leading-relaxed space-y-4 text-sm">
                    <p>
                      O vento sussurrava segredos antigos através das torres de cristal de Eldoria, carregando consigo o
                      aroma de pergaminhos envelhecidos e a promessa de tempestades distantes. Lyra ajustou seus óculos
                      de leitura e mergulhou mais fundo na penumbra da Grande Biblioteca, onde as sombras dançavam entre
                      estantes que se perdiam nas alturas nebulosas do teto abobadado.
                    </p>

                    <p>
                      Havia três dias que ela não dormia adequadamente, consumida pela descoberta que fizera nos
                      arquivos proibidos. O manuscrito que agora repousava diante dela, escrito em runas que pulsavam
                      com uma luz fraca e dourada, continha revelações que poderiam abalar os próprios alicerces do
                      reino. As palavras pareciam se mover na página, reorganizando-se conforme ela lia, como se a
                      própria magia estivesse viva dentro do pergaminho.
                    </p>

                    <p>
                      'Os Últimos Dias da Era Dourada', lia o título em caracteres que mudavam de cor conforme a luz
                      incidente. O texto falava de um tempo em que dragões e humanos viviam em harmonia, quando a magia
                      fluía livremente pelas veias da terra como rios de luz líquida. Mas algo havia acontecido, algo
                      terrível que forçara os dragões a um sono profundo e fizera a magia definhar como flores no
                      inverno.
                    </p>

                    <p>
                      Lyra virou a página com dedos trêmulos. Ali estava o que ela mais temia encontrar: a Profecia da
                      Escolha Final. Segundo o texto, quando a magia estivesse quase extinta, um Escriba Escolhido
                      emergiria para despertar os dragões adormecidos. Mas o despertar viria com um preço - o Escolhido
                      deveria sacrificar sua própria essência mágica para restaurar o equilíbrio, ou assistir ao mundo
                      mergulhar em uma era de trevas eternas.
                    </p>

                    <p>
                      O som de passos ecoando pelos corredores de mármore fez Lyra erguer a cabeça bruscamente. Ela
                      reconheceu imediatamente o caminhar pesado e determinado do Grão-Mestre Aldric, o guardião dos
                      segredos mais profundos da biblioteca. Rapidamente, ela fechou o manuscrito e o escondeu entre
                      outros tomos menos controversos, fingindo estudar um tratado sobre herbologia élfica.
                    </p>

                    <p>
                      'Trabalhando até tarde novamente, jovem Lyra?' A voz grave de Aldric ecoou entre as estantes,
                      carregando uma nota de preocupação paternal. Ele emergiu das sombras como um fantasma benevolente,
                      sua barba prateada brilhando sob a luz mágica das velas flutuantes.
                    </p>

                    <p>
                      'Os estudos sobre as antigas línguas requerem dedicação, Mestre', respondeu ela, tentando manter a
                      voz firme. 'Há tanto conhecimento perdido esperando para ser redescoberto.'
                    </p>

                    <p>
                      Aldric aproximou-se, seus olhos azuis penetrantes parecendo ver através da fachada que ela tentava
                      manter. 'Conhecimento perdido pode ser perigoso, criança. Alguns segredos foram enterrados por
                      boas razões.' Ele fez uma pausa, observando-a com atenção. 'Você tem sentido... mudanças
                      ultimamente? Sonhos estranhos? Visões?'
                    </p>

                    <p>
                      O coração de Lyra acelerou. Como ele poderia saber sobre os sonhos? Sobre as imagens de dragões
                      dourados que visitavam seu sono, sussurrando palavras em línguas que ela não deveria compreender,
                      mas compreendia? Sobre a sensação crescente de que algo antigo e poderoso estava despertando
                      dentro dela?
                    </p>

                    <p>'Eu... não sei do que está falando, Mestre', mentiu ela, mas sua voz traiu sua incerteza.</p>

                    <p>
                      Aldric suspirou profundamente, como se carregasse o peso de séculos em seus ombros. 'A magia está
                      morrendo, Lyra. Você deve ter notado - os cristais de luz estão perdendo seu brilho, as poções dos
                      curandeiros estão falhando, até mesmo os pergaminhos auto-escreventes estão ficando mudos.' Ele se
                      aproximou mais, baixando a voz para um sussurro conspiratório. 'Mas há sinais de que algo está
                      mudando. Energias antigas estão se movendo nas profundezas da terra.'
                    </p>

                    <p>Lyra sentiu um arrepio percorrer sua espinha. 'O que isso significa?'</p>

                    <p>
                      'Significa que o tempo das escolhas difíceis está chegando', respondeu Aldric, seus olhos fixos
                      nos dela. 'E que alguns de nós podem ser chamados a fazer sacrifícios que nunca imaginamos.'
                    </p>

                    <p>
                      Naquela noite, sozinha em seus aposentos na torre dos escribas, Lyra não conseguiu afastar os
                      pensamentos sobre a conversa com Aldric. Ela sabia que ele suspeitava de algo, talvez até soubesse
                      sobre sua descoberta do manuscrito proibido. Mas havia algo mais em seus olhos, uma mistura de
                      medo e esperança que a deixava inquieta.
                    </p>

                    <p>
                      Quando finalmente conseguiu adormecer, os sonhos vieram com mais intensidade do que nunca. Ela se
                      viu voando sobre paisagens que não existiam mais, montada nas costas de um dragão dourado cujas
                      escamas brilhavam como sol líquido. Abaixo deles, florestas de árvores cristalinas se estendiam
                      até o horizonte, e rios de luz pura serpenteavam pela terra como veias de prata.
                    </p>

                    <p>
                      'O tempo está chegando, Escriba', disse o dragão, sua voz ressoando diretamente em sua mente. 'A
                      escolha que definirá o destino de todos nós está próxima. Você está preparada para pagar o preço
                      da salvação?'
                    </p>

                    <p>
                      Lyra acordou com lágrimas nos olhos e uma certeza terrível no coração. Ela era a Escriba Escolhida
                      da profecia, e em breve teria que decidir entre salvar o mundo que amava ou preservar sua própria
                      vida. A magia de Eldoria dependia de sua escolha, e o tempo estava se esgotando.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center pb-8">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl min-h-[56px]"
                  onClick={handleFinishReading}
                >
                  Finalizar Leitura e Avaliar
                </Button>
              </div>
            </div>
          </div>
        )}

        {showFraudPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
              <div className="flex items-center mb-6">
                <button
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-2 -ml-2"
                  onClick={handleBackToBook}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm">Voltar</span>
                </button>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-red-600 mb-2">Possível Fraude</h2>
              </div>

              <div className="bg-red-500 rounded-xl p-6 text-white text-center mb-6">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">⚠️ Possível Tentativa de Fraude</h3>
                <p className="text-lg font-medium mb-4">Tempo de leitura: {formatTime(fraudAttemptTime)}</p>
                <div className="bg-red-600 rounded-xl p-3">
                  <p className="text-sm">
                    Não é possível ler este livro em menos de 30 segundos.
                    <br />
                    Por favor, leia o conteúdo com atenção.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <h4 className="font-semibold text-yellow-800 text-sm">Por que isso aconteceu?</h4>
                </div>
                <ul className="text-yellow-800 text-xs space-y-1 ml-7">
                  <li>• O tempo mínimo para ler este livro é de 30 segundos</li>
                  <li>• Nosso sistema detecta tentativas de burlar o sistema</li>
                  <li>• Para receber o pagamento, você deve ler o conteúdo</li>
                </ul>
              </div>

              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 text-lg font-semibold rounded-xl min-h-[56px]"
                onClick={handleBackToBook}
              >
                Voltar ao Livro
              </Button>
            </div>
          </div>
        )}

        {showQuiz && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center mb-6">
                <button
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-2 -ml-2"
                  onClick={() => setShowQuiz(false)}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm">Voltar</span>
                </button>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {currentQuestion.type === "quiz" ? "Quiz sobre o Livro" : "Avaliação do Livro"}
                </h2>
                <p className="text-gray-500 text-sm">
                  Etapa {quizStep} de {quizQuestions.length}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Progresso</span>
                  <span className="text-sm font-medium text-gray-900">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {quizStep}
                  </div>
                  <h3 className="text-lg font-medium text-blue-600 leading-tight">{currentQuestion.question}</h3>
                </div>
                <div className="text-sm text-gray-500 ml-11 flex items-center gap-4">
                  <span>Tentativas: {currentAttempts}/3</span>
                  {currentQuestion.type === "quiz" && (
                    <span className="text-blue-500">Vale {currentQuestion.points} pontos</span>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {currentQuestion.type === "quiz"
                  ? currentQuestion.options.map((option, index) => {
                      const isSelected = quizAnswers[quizStep] === option
                      const isCorrect = option === currentQuestion.correct
                      const showResult = isSelected && currentResult !== null

                      return (
                        <button
                          key={index}
                          className={`w-full p-4 rounded-xl text-left transition-colors relative min-h-[56px] ${
                            showResult
                              ? currentResult === "correct"
                                ? "bg-green-50 border-2 border-green-500"
                                : "bg-red-50 border-2 border-red-500"
                              : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                          }`}
                          onClick={() => handleQuizAnswer(option)}
                          disabled={!!quizAnswers[quizStep]}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900 text-sm">{option}</span>
                            {showResult && (
                              <div className="flex items-center gap-2">
                                {currentResult === "correct" ? (
                                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : (
                                  <X className="w-5 h-5 text-red-500" />
                                )}
                              </div>
                            )}
                          </div>
                        </button>
                      )
                    })
                  : currentQuestion.options.map((option, index) => {
                      const isSelected = quizAnswers[quizStep] === option.text

                      return (
                        <button
                          key={index}
                          className={`w-full p-4 rounded-xl text-left transition-colors relative min-h-[56px] ${
                            isSelected
                              ? "bg-green-50 border-2 border-green-500"
                              : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                          }`}
                          onClick={() => (!quizAnswers[quizStep] ? handleQuizAnswer(option.text) : undefined)}
                          disabled={!!quizAnswers[quizStep]}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900 text-sm">{option.text}</span>
                            {isSelected && (
                              <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="text-blue-500 text-sm font-medium">+{option.points} pts</span>
                              </div>
                            )}
                          </div>
                        </button>
                      )
                    })}
              </div>

              {currentQuestion.type === "quiz" && currentResult === "incorrect" && currentAttempts < 3 && (
                <div className="text-center mb-6">
                  <Button
                    variant="outline"
                    onClick={handleTryAgain}
                    className="text-orange-500 border-orange-500 hover:bg-orange-50 bg-transparent rounded-xl min-h-[48px]"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Tentar Novamente ({3 - currentAttempts} restantes)
                  </Button>
                </div>
              )}

              <div className="flex justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrevQuestion}
                  disabled={quizStep === 1}
                  className="text-gray-600 bg-white border-gray-300 rounded-xl min-h-[48px] flex-1"
                >
                  Anterior
                </Button>
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white rounded-xl min-h-[48px] flex-1"
                  onClick={handleNextQuestion}
                  disabled={!canProceed() || isCalculating}
                >
                  {isCalculating ? "Calculando..." : quizStep === quizQuestions.length ? "Finalizar" : "Próxima"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {showResultsScreen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎉</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Parabéns!</h2>
                <p className="text-gray-600 text-sm">Sua avaliação foi concluída</p>
              </div>

              <Card className="bg-green-500 border-0 shadow-sm mb-6 rounded-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    R$ {convertedMoney.toFixed(2).replace(".", ",")}
                  </div>
                  <div className="text-lg text-white opacity-90">Seus ganhos por esta avaliação</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm mb-6 rounded-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-bar-chart-3 text-blue-500"
                    >
                      <path d="M12 20V10" />
                      <path d="M18 20V4" />
                      <path d="M6 20v-6" />
                      <line x1="4" x2="20" y1="20" y2="20" />
                    </svg>
                    Como Calculamos Seus Ganhos
                  </h3>

                  {quizPointsBreakdown.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                        <BookOpen className="w-4 h-4 text-orange-500" />
                        Perguntas sobre o Livro
                      </h4>
                      <ul className="space-y-1 ml-2">
                        {quizPointsBreakdown.map((item, index) => (
                          <li key={item.id} className="flex justify-between text-gray-700 text-sm">
                            <span>Pergunta {index + 1}:</span>
                            <span className="font-medium text-green-600">+{item.points} pontos</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {evaluationPointsBreakdown.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500" />
                        Avaliação do Livro
                      </h4>
                      <ul className="space-y-1 ml-2">
                        {evaluationPointsBreakdown.map((item, index) => (
                          <li key={item.id} className="flex justify-between text-gray-700 text-sm">
                            <span>Avaliação {index + 1}:</span>
                            <span className="font-medium text-blue-600">+{item.points} pontos</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm mb-6 rounded-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    Tempo de Leitura
                  </h3>
                  <ul className="space-y-1 ml-2">
                    <li className="flex justify-between text-gray-700 text-sm">
                      <span>Tempo total:</span>
                      <span className="font-medium text-gray-900">{formatTime(readingTime)}</span>
                    </li>
                    <li className="flex justify-between text-gray-700 text-sm">
                      <span>Bônus de tempo:</span>
                      <span className="font-medium text-blue-600">+0 pontos</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-2 border-green-500 shadow-sm mb-8 rounded-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">Total de pontos: {totalScore}/160</div>
                  <div className="text-sm text-gray-600">
                    Convertido em: R$ {convertedMoney.toFixed(2).replace(".", ",")}
                  </div>
                </CardContent>
              </Card>

              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-xl min-h-[56px]"
                onClick={() => {
                  setDashboardBalance((prevBalance) => prevBalance + convertedMoney)
                  setBookCompleted(true)
                  setShowResultsScreen(false)
                  setShowDashboard(true)
                  setActiveTab("home")
                }}
              >
                Finalizar e Receber R$ {convertedMoney.toFixed(2).replace(".", ",")}
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <header className="py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Beta Reader</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="text-gray-600 hover:text-gray-900 font-medium p-2"
              onClick={() => setShowLoginModal(true)}
            >
              Entrar
            </button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium min-h-[44px]"
              onClick={() => setShowSignupModal(true)}
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </header>

      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-8">
            <Shield className="w-4 h-4" />
            <span className="font-medium text-sm">100% Segura</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Transforme sua
            <br />
            <span className="text-orange-500">paixão por livros</span>
            <br />
            em renda extra
          </h1>

          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Seja pago para ler e avaliar livros incríveis. Mais de{" "}
            <span className="text-orange-500 font-semibold">R$ 900.000</span> já foram pagos aos nossos leitores.
            Junte-se à maior comunidade de beta readers do Brasil.
          </p>

          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl mb-8 w-full md:w-auto min-h-[56px]"
            onClick={() => setShowSignupModal(true)}
          >
            Começar Agora - É Grátis
          </Button>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Sem taxas de inscrição</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>3.500+ leitores ativos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>4.9/5 avaliação</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>100% seguro</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-1">R$ 900.000+</div>
              <div className="text-gray-600 text-sm">Pagos aos leitores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-1">3.500+</div>
              <div className="text-gray-600 text-sm">Leitores ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-1">15.000+</div>
              <div className="text-gray-600 text-sm">Avaliações publicadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-1">R$ 50-900</div>
              <div className="text-gray-600 text-sm">Por avaliação</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-4">Como Funciona</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Processo simples em 3 passos para começar a ganhar dinheiro lendo livros
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Leia o Livro</h3>
              <p className="text-gray-600 text-sm">
                Escolha um livro da nossa biblioteca e leia com atenção. Cada livro tem um valor específico.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Avalie e Responda</h3>
              <p className="text-gray-600 text-sm">
                Responda perguntas sobre o conteúdo e dê sua opinião honesta sobre a qualidade da obra.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Receba o Pagamento</h3>
              <p className="text-gray-600 text-sm">
                Receba entre R$ 50 e R$ 900 por avaliação diretamente na sua conta via PIX.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Por Que Escolher a Beta Reader?
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Somos a plataforma mais confiável e que mais paga no Brasil
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Seguro</h3>
              <p className="text-gray-600 text-sm">Plataforma verificada e pagamentos garantidos via PIX</p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Comunidade Ativa</h3>
              <p className="text-gray-600 text-sm">Mais de 3.500 leitores ativos compartilhando experiências</p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pagamentos Rápidos</h3>
              <p className="text-gray-600 text-sm">Receba seu dinheiro em até 24 horas via PIX</p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Livros Variados</h3>
              <p className="text-gray-600 text-sm">Biblioteca com centenas de livros de todos os gêneros</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-4">O Que Nossos Leitores Dizem</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Depoimentos reais de quem já está ganhando dinheiro conosco
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-07-28%20210238-Zu2qEInwp63SpEugnLg9rSrLjL7b0c.png"
                    alt="Ana Silva"
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=48&width=48&text=AS"
                    }}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Ana Silva</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  "Já ganhei mais de R$ 2.300 em 3 meses! É incrível poder ganhar dinheiro fazendo algo que amo. A
                  plataforma é super confiável."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-07-28%20210136-6p8jGCC9xXxZn2VLRGZg5ILy8phDTP.png"
                    alt="Marina Costa"
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=48&width=48&text=MC"
                    }}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Marina Costa</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  "Processo muito simples e pagamentos sempre em dia. Já indiquei para vários amigos. Recomendo demais!"
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-07-28%20210415-20TSDWNCzlIN2Llue6hBz60fRUO1H3.png"
                    alt="Carlos Mendes"
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=48&width=48&text=CM"
                    }}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Carlos Mendes</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  "Descobri livros incríveis e ainda ganho uma renda extra. É o trabalho dos sonhos para quem ama ler!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-orange-500">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Pronto Para Começar?</h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de leitores que já estão ganhando dinheiro com sua paixão por livros
          </p>
          <Button
            className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl mb-4 w-full md:w-auto min-h-[56px]"
            onClick={() => setShowSignupModal(true)}
          >
            Começar Agora - É Grátis
          </Button>
          <p className="text-orange-100 text-sm">Sem taxas de inscrição • Pagamentos garantidos • Suporte 24/7</p>
        </div>
      </section>

      {showSignupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowSignupModal(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Criar Conta</h2>
              <p className="text-gray-600 text-sm">Comece a ganhar dinheiro lendo livros</p>
            </div>

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Senha <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold rounded-xl min-h-[48px]"
              >
                Criar Conta Grátis
              </Button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-4">
              Ao criar uma conta, você concorda com nossos{" "}
              <a href="#" className="text-orange-500 hover:underline">
                Termos de Uso
              </a>{" "}
              e{" "}
              <a href="#" className="text-orange-500 hover:underline">
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowLoginModal(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔑</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Entrar</h2>
              <p className="text-gray-600 text-sm">Acesse sua conta Beta Reader</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Senha <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Sua senha"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold rounded-xl min-h-[48px]"
              >
                Entrar
              </Button>
            </form>

            <div className="text-center mt-4">
              <a href="#" className="text-orange-500 hover:underline text-sm">
                Esqueceu sua senha?
              </a>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
              Não tem uma conta?{" "}
              <button
                className="text-orange-500 hover:underline"
                onClick={() => {
                  setShowLoginModal(false)
                  setShowSignupModal(true)
                }}
              >
                Cadastre-se grátis
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
