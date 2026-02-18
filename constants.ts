import { TutorialStep, Language } from './types';

export const UI_TEXT: Record<Language, any> = {
    es: {
        title: "GitPunk",
        subtitle: "Protocolo de Inicio",
        roadmap: "Roadmap Activado",
        credits: "protocol_dev_by",
        repo: "Repo",
        star: "Star",
        phase: "FASE",
        node: "NODO",
        knowledgeBase: "Base de Conocimiento",
        activeInstruction: "Instrucción Activa",
        objective: "Objetivo de la Fase",
        prev: "Anterior",
        next: "Siguiente Nodo",
        completedTitle: "¡Completado!",
        completedDesc: "Has completado el ciclo. Tu código ahora vive seguro en la nube de GitHub. ¡Has dominado el flujo básico de Git!",
        commandBreakdown: "Desglose del Comando",
        matrixTitle: "GIT CHEATSHEET",
        openMatrix: "Cheatsheet",
        terminal: {
            headerIntro: "SYSTEM_LOG",
            headerShell: "git-punk-shell",
            openWin: "Abrir PowerShell",
            openUnix: "Abrir Terminal",
            copy: "Copiar",
            copied: "Copiado",
            readOnly: "SOLO LECTURA",
            mobileWin: 'Usa "PowerShell" en Windows',
            mobileUnix: 'Usa "Terminal" en Mac/Linux',
        },
        chat: {
            placeholder: "Escribe tu duda...",
            placeholderOverload: "Esperando enfriamiento...",
            linkStable: "ENLACE ESTABLE",
            linkUnstable: "ENLACEINESTABLE",
            linkBusy: "OCUPADO",
            welcome: "Hola. Soy tu Asistente de Git. Pregúntame si no entiendes algo.",
            status: {
                online: "ONLINE",
                processing: "COMPUTING...",
                overload: "COOLING DOWN",
                offline: "OFFLINE"
            }
        }
    },
    en: {
        title: "GitPunk",
        subtitle: "Init Protocol",
        roadmap: "Roadmap Active",
        credits: "protocol_dev_by",
        repo: "Repo",
        star: "Star",
        phase: "PHASE",
        node: "NODE",
        knowledgeBase: "Knowledge Base",
        activeInstruction: "Active Instruction",
        objective: "Phase Objective",
        prev: "Previous",
        next: "Next Node",
        completedTitle: "Completed!",
        completedDesc: "Cycle complete. Your code now lives safely in the GitHub cloud. You have mastered the basic Git flow!",
        commandBreakdown: "Command Breakdown",
        matrixTitle: "GIT CHEATSHEET",
        openMatrix: "Cheatsheet",
        terminal: {
            headerIntro: "SYSTEM_LOG",
            headerShell: "git-punk-shell",
            openWin: "Open PowerShell",
            openUnix: "Open Terminal",
            copy: "Copy",
            copied: "Copied",
            readOnly: "READ ONLY",
            mobileWin: 'Use "PowerShell" on Windows',
            mobileUnix: 'Use "Terminal" on Mac/Linux',
        },
        chat: {
            placeholder: "Type your query...",
            placeholderOverload: "Awaiting cool-down...",
            linkStable: "LINK STABLE",
            linkUnstable: "LINK UNSTABLE",
            linkBusy: "BUSY",
            welcome: "Hello. I am your Git Assistant. Ask me if you don't understand something.",
            status: {
                online: "ONLINE",
                processing: "COMPUTING...",
                overload: "COOLING DOWN",
                offline: "OFFLINE"
            }
        }
    }
};

const STEPS_ES: TutorialStep[] = [
    // --- FASE 0: INTRODUCCIÓN ---
    {
        id: 1,
        title: "¿Qué es Git y GitHub?",
        command: "LOADING CONCEPT: GIT_VS_GITHUB...",
        description: "Antes de escribir código, entiende la diferencia. Son dos cosas distintas.",
        explanation: "Git es un sistema de control de versiones que vive en tu PC. GitHub es una plataforma en la nube que aloja repositorios Git. Son complementarios: Git gestiona el historial localmente, GitHub lo comparte con el mundo. Puedes usar Git sin GitHub, pero no GitHub sin Git.",
        practicalTask: "Lee esto atentamente: Git vive en tu PC. GitHub vive en Internet. No necesitas escribir nada aún, solo asimila el concepto.",
        category: "CONCEPTOS CLAVE",
        icon: 'BrainCircuit'
    },
    {
        id: 2,
        title: "El Flujo de Trabajo",
        command: "LOADING WORKFLOW: EDIT -> ADD -> COMMIT...",
        description: "El ciclo de vida de tu código tiene 3 estados.",
        explanation: "Todo cambio en Git pasa por 3 estados: 1) Working Directory — editas el archivo. 2) Staging Area (git add) — seleccionas qué cambios incluir en el próximo guardado. 3) Repository (git commit) — el cambio queda registrado permanentemente en el historial. Este flujo te da control total sobre qué guardar y cuándo.",
        practicalTask: "Entiende esto: No se guarda automáticamente. Tú decides cuándo sacar la 'foto' (commit) de tu trabajo. Ahora, prepárate para instalar.",
        category: "CONCEPTOS CLAVE",
        icon: 'RefreshCw'
    },

    // --- FASE 1: PREPARACIÓN ---
    {
        id: 3,
        title: "Instalar el Núcleo (Git)",
        command: {
            windows: 'winget install --id Git.Git -e --source winget',
            linux: 'sudo apt install git-all'
        },
        description: "Instala el software necesario en tu sistema.",
        explanation: "Git no viene preinstalado en Windows. En Linux/Mac suele estar disponible pero puede estar desactualizado. 'winget' es el gestor de paquetes oficial de Windows 10/11. 'apt' es el de Debian/Ubuntu. Tras instalar, cierra y vuelve a abrir la terminal para que el comando 'git' sea reconocido.",
        practicalTask: "IMPORTANTE: Si usas Windows, busca 'PowerShell' en el menú inicio y ábrelo. Si usas Mac/Linux, abre la app 'Terminal'. Luego copia y pega el comando correspondiente.",
        category: "INSTALACIÓN",
        icon: 'Download'
    },
    {
        id: 4,
        title: "Configurar Identidad",
        command: 'git config --global user.name "TuNombre"',
        description: "Firma digital para tus trabajos.",
        explanation: "Git firma cada commit con tu nombre y email. Sin esta configuración, los commits aparecen como 'unknown'. '--global' lo aplica a todos tus proyectos en este equipo. Puedes sobreescribirlo por proyecto omitiendo '--global'. Verifica con: git config --global --list",
        practicalTask: "En tu terminal (PowerShell o Bash), reemplaza 'TuNombre' con tu nombre real o nick y presiona Enter.",
        category: "CONFIGURACIÓN",
        icon: 'User',
        flagDetails: [
            { flag: "--global", description: "Aplica la configuración a nivel de usuario (para todos tus proyectos), no solo en esta carpeta." }
        ]
    },

    // --- FASE 2: INICIO DEL PROYECTO ---
    {
        id: 5,
        title: "Crear Base de Operaciones",
        command: {
            windows: 'mkdir CyberProfile; cd CyberProfile',
            linux: 'mkdir CyberProfile && cd CyberProfile'
        },
        description: "Crea una carpeta para el proyecto.",
        explanation: "Cada proyecto Git debe vivir en su propia carpeta. 'mkdir' crea el directorio y 'cd' entra en él. En Windows se separan con ';', en Linux/Mac con '&&'. Mantén los nombres sin espacios para evitar problemas en la terminal.",
        practicalTask: "Asegúrate de estar en tu PowerShell (Win) o Terminal (Mac/Linux). Ejecuta el comando para crear la carpeta y entrar en ella.",
        category: "CICLO BÁSICO",
        icon: 'FolderPlus'
    },
    {
        id: 6,
        title: "Inicializar Git",
        command: 'git init',
        description: "Activa el rastreo de Git en esta carpeta.",
        explanation: "'git init' crea una carpeta oculta '.git' dentro de tu proyecto. Ahí Git almacena todo: historial, ramas, configuración. Sin esta carpeta, Git no rastrea nada. Solo se ejecuta una vez por proyecto. Nunca borres la carpeta '.git' manualmente.",
        practicalTask: "Ejecuta 'git init'. Verás un mensaje que dice 'Initialized empty Git repository'.",
        category: "CICLO BÁSICO",
        icon: 'Zap'
    },

    // --- FASE 3: CREACIÓN Y GUARDADO ---
    {
        id: 7,
        title: "Crear Archivo Fuente",
        command: {
            windows: 'echo "<h1>Hola Mundo Cyberpunk</h1>" > index.html',
            linux: 'echo "<h1>Hola Mundo Cyberpunk</h1>" > index.html'
        },
        description: "Crea tu primer archivo HTML.",
        explanation: "'echo' imprime texto y '>' lo redirige a un archivo (lo crea si no existe, lo sobreescribe si existe). En proyectos reales usarías VS Code o cualquier editor. Este paso simula crear tu primer archivo de código para que Git tenga algo que rastrear.",
        practicalTask: "Copia el comando. Esto creará un archivo llamado 'index.html' con un título dentro.",
        category: "CICLO BÁSICO",
        icon: 'FileCode'
    },
    {
        id: 8,
        title: "Verificar Radar (Status)",
        command: 'git status',
        description: "Consulta qué archivos son nuevos o han cambiado.",
        explanation: "'git status' es tu radar en tiempo real. Muestra 3 categorías: Untracked (rojo) — archivos nuevos que Git no conoce. Modified (rojo) — archivos conocidos con cambios sin preparar. Staged (verde) — listos para el próximo commit. Úsalo constantemente, es gratuito y no modifica nada.",
        practicalTask: "Ejecuta el comando y observa las letras rojas.",
        category: "CICLO BÁSICO",
        icon: 'Radar'
    },
    {
        id: 9,
        title: "Preparar (Stage)",
        command: 'git add index.html',
        description: "Mueve el archivo al área de preparación.",
        explanation: "'git add' mueve cambios al Staging Area. Puedes ser selectivo: 'git add index.html' agrega solo ese archivo. 'git add .' agrega todo. Esto te permite hacer commits atómicos — un commit por funcionalidad, no uno por sesión de trabajo.",
        practicalTask: "Ejecuta el comando. Si haces 'git status' de nuevo, verás que ahora está verde.",
        category: "CICLO BÁSICO",
        icon: 'PackagePlus'
    },
    {
        id: 10,
        title: "Guardar Versión (Commit)",
        command: 'git commit -m "Crear home page"',
        description: "Guarda los cambios permanentemente.",
        explanation: "Un commit es una instantánea permanente del proyecto en ese momento. Cada commit tiene: un hash único (ej: a3f2c1d), autor, fecha y mensaje. El mensaje debe describir el QUÉ y el POR QUÉ del cambio, no el cómo. Convención: usa verbos en imperativo ('Crear', 'Corregir', 'Añadir').",
        practicalTask: "Ejecuta el comando para consolidar tu creación.",
        category: "CICLO BÁSICO",
        icon: 'Save',
        flagDetails: [
            { flag: "-m", description: "Message (Mensaje). Permite escribir la descripción del cambio directamente en el comando." }
        ]
    },

    // --- FASE 4: MODIFICACIÓN ---
    {
        id: 11,
        title: "Analizar Diferencias (Diff)",
        command: 'git diff',
        description: "Muestra qué cambió exactamente dentro de los archivos.",
        explanation: "'git diff' compara el Working Directory con el Staging Area y muestra las diferencias línea por línea. Las líneas en rojo (con '-') son lo que se eliminó. Las verdes (con '+') son lo que se añadió. Si ya hiciste 'git add', usa 'git diff --staged' para ver los cambios preparados.",
        practicalTask: "Primero modifica el archivo (ej: echo '<h2>Status: Online</h2>' >> index.html) y luego ejecuta 'git diff'.",
        category: "CICLO BÁSICO",
        icon: 'ScanEye'
    },
    {
        id: 12,
        title: "Guardar Cambios V2",
        command: 'git add . && git commit -m "Añadir subtitulo"',
        description: "Un combo: Preparar todo y guardar.",
        explanation: "'git add .' es el selector universal — agrega todos los archivos modificados y nuevos del directorio actual (y subdirectorios). Combinarlo con commit en una línea es eficiente para cambios simples. Para cambios complejos, es mejor revisar con 'git status' antes de hacer add masivo.",
        practicalTask: "Ejecuta este combo para guardar la versión 2.0 de tu web.",
        category: "CICLO BÁSICO",
        icon: 'Layers',
        flagDetails: [
            { flag: ".", description: "Selector comodín. Indica 'todo el directorio actual'. Agrega todos los archivos modificados o nuevos." },
            { flag: "-m", description: "Message. Especifica el mensaje del commit." }
        ]
    },

    // --- FASE: UNIVERSOS PARALELOS (NUEVO) ---
    {
        id: 13,
        title: "Crear Rama (Branch)",
        command: 'git branch feature-login',
        description: "Crea una línea temporal alternativa.",
        explanation: "Una rama es un puntero ligero a un commit específico. Crear una rama es instantáneo y no copia archivos. La rama 'main' sigue intacta mientras trabajas en 'feature-login'. Esto es la base del trabajo en equipo: cada desarrollador trabaja en su rama sin interferir con los demás.",
        practicalTask: "Ejecuta el comando para crear una rama llamada 'feature-login'. Tu código principal (main) seguirá intacto.",
        category: "UNIVERSOS PARALELOS",
        icon: 'GitBranch'
    },
    {
        id: 14,
        title: "Cambiar de Universo",
        command: 'git checkout feature-login',
        description: "Te teletransporta a la nueva rama.",
        explanation: "'git checkout' mueve el puntero HEAD a la rama indicada y actualiza tu Working Directory con los archivos de esa rama. En Git moderno (2.23+) se prefiere 'git switch feature-login' que es más claro. Puedes ver en qué rama estás con 'git branch' — la activa tiene un asterisco.",
        practicalTask: "Ejecuta el comando. Verás 'Switched to branch feature-login'. Nota: En versiones nuevas también se usa 'git switch'.",
        category: "UNIVERSOS PARALELOS",
        icon: 'ArrowRightLeft',
        flagDetails: [
            { flag: "checkout", description: "Comando para cambiar de rama o restaurar archivos." }
        ]
    },
    {
        id: 15,
        title: "Fusión de Realidades",
        command: 'git checkout main && git merge feature-login',
        description: "Une los cambios de la rama experimental a la principal.",
        explanation: "'git merge' integra el historial de una rama en otra. Primero vuelves a 'main' (la rama destino), luego ejecutas merge. Si no hay conflictos, Git hace un 'fast-forward' o crea un commit de merge automáticamente. Si hay conflictos, Git marca los archivos y tú los resuelves manualmente.",
        practicalTask: "Regresa a main y fusiona tu trabajo. Ahora tu experimento es oficial.",
        category: "UNIVERSOS PARALELOS",
        icon: 'GitMerge'
    },

    // --- FASE 5: CONEXIÓN A GITHUB ---
    {
        id: 16,
        title: "Renombrar Rama Principal",
        command: 'git branch -M main',
        description: "Estandariza el nombre de tu línea temporal.",
        explanation: "El estándar de la industria cambió de 'master' a 'main' en 2020 (GitHub, GitLab, Bitbucket). '-M' fuerza el renombrado incluso si ya existe una rama 'main'. Es importante hacerlo antes de conectar con GitHub para que los nombres coincidan y el push funcione sin configuración extra.",
        practicalTask: "Ejecuta el comando para modernizar tu repositorio.",
        category: "NUBE & COLABORACIÓN",
        icon: 'GitBranch',
        flagDetails: [
            { flag: "-M", description: "Move/Force. Renombra la rama actual forzando el cambio, incluso si el nombre ya existe." }
        ]
    },
    {
        id: 17,
        title: "Crear Repositorio en GitHub",
        command: 'echo "Ir a GitHub.com -> New Repository"',
        description: "Acción manual en el navegador.",
        explanation: "Un repositorio en GitHub es el espacio en la nube para tu proyecto. Al crearlo, NO marques 'Initialize with README' — si lo haces, GitHub crea un commit inicial que entrará en conflicto con tu historial local al intentar hacer push. Copia la URL HTTPS (no SSH) si aún no tienes llaves SSH configuradas.",
        practicalTask: "Ve a GitHub.com, inicia sesión, crea un repo nuevo llamado 'CyberProfile'. NO inicialices con README. Copia la URL HTTPS.",
        category: "NUBE & COLABORACIÓN",
        icon: 'Globe'
    },
    {
        id: 18,
        title: "Conectar Cables (Remote)",
        command: 'git remote add origin https://github.com/TU_USUARIO/CyberProfile.git',
        description: "Vincula tu carpeta local con GitHub.",
        explanation: "'git remote add' registra una URL remota con un alias. 'origin' es la convención universal para el remoto principal. Puedes tener múltiples remotos (ej: 'upstream' para el repo original en un fork). Verifica con 'git remote -v'. La URL puede ser HTTPS (usuario/contraseña) o SSH (llave pública).",
        practicalTask: "Pega el comando PERO reemplaza la URL con la que copiaste de tu GitHub real.",
        category: "NUBE & COLABORACIÓN",
        icon: 'Link',
        flagDetails: [
            { flag: "add", description: "Subcomando para registrar un nuevo repositorio remoto." },
            { flag: "origin", description: "Alias estándar para tu repositorio remoto principal." }
        ]
    },
    {
        id: 19,
        title: "Subir a la Nube (Push)",
        command: 'git push -u origin main',
        description: "Envía tus commits locales a GitHub.",
        explanation: "'git push' envía tus commits locales al remoto. '-u' (--set-upstream) establece el tracking: de ahora en adelante, 'git push' sin argumentos sabrá a dónde enviar. Si es tu primera vez, GitHub pedirá autenticación vía navegador (token) o llave SSH. Tras el push, tus commits son visibles en github.com.",
        practicalTask: "Ejecuta el comando. Si es tu primera vez, te pedirá iniciar sesión en el navegador.",
        category: "NUBE & COLABORACIÓN",
        icon: 'UploadCloud',
        flagDetails: [
            { flag: "-u", description: "Upstream. Establece un enlace permanente entre tu rama local y la de la nube para futuros pushes." }
        ]
    }
];

const STEPS_EN: TutorialStep[] = [
    // --- PHASE 0: INTRO ---
    {
        id: 1,
        title: "What is Git vs GitHub?",
        command: "LOADING CONCEPT: GIT_VS_GITHUB...",
        description: "Before writing code, understand the difference. They are two distinct entities.",
        explanation: "Git is a version control system that lives on your PC. GitHub is a cloud platform that hosts Git repositories. They are complementary: Git manages history locally, GitHub shares it with the world. You can use Git without GitHub, but not GitHub without Git.",
        practicalTask: "Read carefully: Git lives on your PC. GitHub lives on the Internet. No need to write code yet, just assimilate the concept.",
        category: "KEY CONCEPTS",
        icon: 'BrainCircuit'
    },
    {
        id: 2,
        title: "The Workflow",
        command: "LOADING WORKFLOW: EDIT -> ADD -> COMMIT...",
        description: "Your code's lifecycle has 3 states.",
        explanation: "Every change in Git goes through 3 states: 1) Working Directory — you edit the file. 2) Staging Area (git add) — you select which changes to include in the next save. 3) Repository (git commit) — the change is permanently recorded in history. This flow gives you full control over what to save and when.",
        practicalTask: "Understand this: Autosave doesn't exist here. You decide when to take the 'snapshot' (commit) of your work. Now, prepare to install.",
        category: "KEY CONCEPTS",
        icon: 'RefreshCw'
    },

    // --- PHASE 1: PREP ---
    {
        id: 3,
        title: "Install the Core (Git)",
        command: {
            windows: 'winget install --id Git.Git -e --source winget',
            linux: 'sudo apt install git-all'
        },
        description: "Install necessary software on your system.",
        explanation: "Git is not pre-installed on Windows. On Linux/Mac it may be available but outdated. 'winget' is the official Windows 10/11 package manager. 'apt' is for Debian/Ubuntu. After installing, close and reopen your terminal so the 'git' command is recognized.",
        practicalTask: "IMPORTANT: If using Windows, open 'PowerShell'. If Mac/Linux, open 'Terminal'. Then copy and paste the command.",
        category: "INSTALLATION",
        icon: 'Download'
    },
    {
        id: 4,
        title: "Configure Identity",
        command: 'git config --global user.name "YourName"',
        description: "Digital signature for your work.",
        explanation: "Git signs every commit with your name and email. Without this config, commits show as 'unknown'. '--global' applies it to all projects on this machine. You can override it per project by omitting '--global'. Verify with: git config --global --list",
        practicalTask: "In your terminal, replace 'YourName' with your real name or handle and press Enter.",
        category: "CONFIGURATION",
        icon: 'User',
        flagDetails: [
            { flag: "--global", description: "Applies the setting to the current user (all projects), not just this folder." }
        ]
    },

    // --- PHASE 2: PROJECT INIT ---
    {
        id: 5,
        title: "Create Base of Operations",
        command: {
            windows: 'mkdir CyberProfile; cd CyberProfile',
            linux: 'mkdir CyberProfile && cd CyberProfile'
        },
        description: "Create a folder for the project.",
        explanation: "Each Git project should live in its own folder. 'mkdir' creates the directory and 'cd' enters it. On Windows they are chained with ';', on Linux/Mac with '&&'. Keep names without spaces to avoid terminal issues.",
        practicalTask: "Ensure you are in PowerShell (Win) or Terminal (Mac/Linux). Run the command to create the folder and enter it.",
        category: "BASIC CYCLE",
        icon: 'FolderPlus'
    },
    {
        id: 6,
        title: "Initialize Git",
        command: 'git init',
        description: "Activate Git tracking in this folder.",
        explanation: "'git init' creates a hidden '.git' folder inside your project. That's where Git stores everything: history, branches, config. Without this folder, Git tracks nothing. Run it only once per project. Never delete '.git' manually.",
        practicalTask: "Run 'git init'. You will see a message saying 'Initialized empty Git repository'.",
        category: "BASIC CYCLE",
        icon: 'Zap'
    },

    // --- PHASE 3: CREATE & SAVE ---
    {
        id: 7,
        title: "Create Source File",
        command: {
            windows: 'echo "<h1>Hello Cyberpunk World</h1>" > index.html',
            linux: 'echo "<h1>Hello Cyberpunk World</h1>" > index.html'
        },
        description: "Create your first HTML file.",
        explanation: "'echo' prints text and '>' redirects it to a file (creates it if it doesn't exist, overwrites if it does). In real projects you'd use VS Code or any editor. This step simulates creating your first code file so Git has something to track.",
        practicalTask: "Copy the command. This will create a file named 'index.html' with a title inside.",
        category: "BASIC CYCLE",
        icon: 'FileCode'
    },
    {
        id: 8,
        title: "Check Radar (Status)",
        command: 'git status',
        description: "Check which files are new or changed.",
        explanation: "'git status' is your real-time radar. It shows 3 categories: Untracked (red) — new files Git doesn't know about. Modified (red) — known files with unstaged changes. Staged (green) — ready for the next commit. Use it constantly — it's free and modifies nothing.",
        practicalTask: "Run the command and observe the red text.",
        category: "BASIC CYCLE",
        icon: 'Radar'
    },
    {
        id: 9,
        title: "Stage Files",
        command: 'git add index.html',
        description: "Move file to the staging area.",
        explanation: "'git add' moves changes to the Staging Area. You can be selective: 'git add index.html' adds only that file. 'git add .' adds everything. This lets you make atomic commits — one commit per feature, not one per work session.",
        practicalTask: "Run the command. If you do 'git status' again, you'll see it is now green.",
        category: "BASIC CYCLE",
        icon: 'PackagePlus'
    },
    {
        id: 10,
        title: "Save Version (Commit)",
        command: 'git commit -m "Create home page"',
        description: "Permanently save changes.",
        explanation: "A commit is a permanent snapshot of the project at that moment. Each commit has: a unique hash (e.g. a3f2c1d), author, date, and message. The message should describe the WHAT and WHY of the change, not the how. Convention: use imperative verbs ('Create', 'Fix', 'Add').",
        practicalTask: "Run the command to consolidate your creation.",
        category: "BASIC CYCLE",
        icon: 'Save',
        flagDetails: [
            { flag: "-m", description: "Message. Allows you to provide the commit description inline." }
        ]
    },

    // --- PHASE 4: MODIFY ---
    {
        id: 11,
        title: "Analyze Diff",
        command: 'git diff',
        description: "Show exactly what changed inside files.",
        explanation: "'git diff' compares the Working Directory with the Staging Area and shows differences line by line. Red lines (with '-') are what was removed. Green lines (with '+') are what was added. If you already ran 'git add', use 'git diff --staged' to see staged changes.",
        practicalTask: "First modify the file (e.g., echo '<h2>Status: Online</h2>' >> index.html) then run 'git diff'.",
        category: "BASIC CYCLE",
        icon: 'ScanEye'
    },
    {
        id: 12,
        title: "Save Changes V2",
        command: 'git add . && git commit -m "Add subtitle"',
        description: "Combo: Stage everything and save.",
        explanation: "'git add .' is the universal selector — it stages all modified and new files in the current directory (and subdirectories). Chaining it with commit is efficient for simple changes. For complex changes, review with 'git status' before a mass add.",
        practicalTask: "Run this combo to save version 2.0 of your web.",
        category: "BASIC CYCLE",
        icon: 'Layers',
        flagDetails: [
            { flag: ".", description: "Wildcard selector. Represents 'current directory', adding all modified files." },
            { flag: "-m", description: "Message. Sets the commit message." }
        ]
    },

    // --- PHASE: PARALLEL UNIVERSES (NEW) ---
    {
        id: 13,
        title: "Create Branch",
        command: 'git branch feature-login',
        description: "Create an alternative timeline.",
        explanation: "A branch is a lightweight pointer to a specific commit. Creating a branch is instant and copies no files. The 'main' branch stays intact while you work on 'feature-login'. This is the foundation of teamwork: each developer works on their own branch without interfering with others.",
        practicalTask: "Run the command to create a branch named 'feature-login'. Your main code stays intact.",
        category: "PARALLEL UNIVERSES",
        icon: 'GitBranch'
    },
    {
        id: 14,
        title: "Switch Universe",
        command: 'git checkout feature-login',
        description: "Teleport to the new branch.",
        explanation: "'git checkout' moves the HEAD pointer to the specified branch and updates your Working Directory with that branch's files. In modern Git (2.23+) 'git switch feature-login' is preferred for clarity. See which branch you're on with 'git branch' — the active one has an asterisk.",
        practicalTask: "Run command. You'll see 'Switched to branch feature-login'. Note: Newer versions use 'git switch'.",
        category: "PARALLEL UNIVERSES",
        icon: 'ArrowRightLeft',
        flagDetails: [
            { flag: "checkout", description: "Command to switch branches or restore files." }
        ]
    },
    {
        id: 15,
        title: "Merge Realities",
        command: 'git checkout main && git merge feature-login',
        description: "Join changes from experiment to main.",
        explanation: "'git merge' integrates the history of one branch into another. First return to 'main' (the target branch), then run merge. If no conflicts, Git does a fast-forward or creates a merge commit automatically. If conflicts exist, Git marks the files and you resolve them manually.",
        practicalTask: "Return to main and merge your work. Your experiment is now official.",
        category: "PARALLEL UNIVERSES",
        icon: 'GitMerge'
    },

    // --- PHASE 5: GITHUB CONNECT ---
    {
        id: 16,
        title: "Rename Main Branch",
        command: 'git branch -M main',
        description: "Standardize your timeline name.",
        explanation: "The industry standard shifted from 'master' to 'main' in 2020 (GitHub, GitLab, Bitbucket). '-M' forces the rename even if a 'main' branch already exists. Do this before connecting to GitHub so branch names match and push works without extra config.",
        practicalTask: "Run the command to modernize your repository.",
        category: "CLOUD & COLLAB",
        icon: 'GitBranch',
        flagDetails: [
            { flag: "-M", description: "Move/Force. Renames the current branch forcefully, even if the name exists." }
        ]
    },
    {
        id: 17,
        title: "Create GitHub Repo",
        command: 'echo "Go to GitHub.com -> New Repository"',
        description: "Manual action in browser.",
        explanation: "A GitHub repository is the cloud space for your project. When creating it, do NOT check 'Initialize with README' — if you do, GitHub creates an initial commit that will conflict with your local history when you try to push. Copy the HTTPS URL (not SSH) if you haven't set up SSH keys yet.",
        practicalTask: "Go to GitHub.com, login, create a new repo named 'CyberProfile'. DO NOT initialize with README. Copy the HTTPS URL.",
        category: "CLOUD & COLLAB",
        icon: 'Globe'
    },
    {
        id: 18,
        title: "Connect Cables (Remote)",
        command: 'git remote add origin https://github.com/YOUR_USER/CyberProfile.git',
        description: "Link local folder with GitHub.",
        explanation: "'git remote add' registers a remote URL with an alias. 'origin' is the universal convention for the primary remote. You can have multiple remotes (e.g. 'upstream' for the original repo in a fork). Verify with 'git remote -v'. The URL can be HTTPS (username/password) or SSH (public key).",
        practicalTask: "Paste the command BUT replace the URL with the one you copied from your real GitHub.",
        category: "CLOUD & COLLAB",
        icon: 'Link',
        flagDetails: [
            { flag: "add", description: "Subcommand to register a new remote." },
            { flag: "origin", description: "Standard alias/name for your primary remote repository." }
        ]
    },
    {
        id: 19,
        title: "Upload to Cloud (Push)",
        command: 'git push -u origin main',
        description: "Send local commits to GitHub.",
        explanation: "'git push' sends your local commits to the remote. '-u' (--set-upstream) sets tracking: from now on, 'git push' with no arguments knows where to send. First time, GitHub will ask for authentication via browser (token) or SSH key. After pushing, your commits are visible on github.com.",
        practicalTask: "Run the command. If it's your first time, it will ask to login in browser.",
        category: "CLOUD & COLLAB",
        icon: 'UploadCloud',
        flagDetails: [
            { flag: "-u", description: "Upstream. Sets a permanent link between your local branch and the cloud one for future pushes." }
        ]
    }
];

export const TUTORIAL_CONTENT: Record<Language, TutorialStep[]> = {
    es: STEPS_ES,
    en: STEPS_EN
};

export const CHEAT_SHEET_DATA: Record<Language, { category: string, commands: { cmd: string, desc: string }[] }[]> = {
    es: [
        {
            category: "Configuración",
            commands: [
                { cmd: 'git config --global user.name "Nombre"', desc: 'Define tu nombre de usuario global.' },
                { cmd: 'git config --global user.email "mail"', desc: 'Define tu correo global.' },
                { cmd: 'git config --list', desc: 'Ver toda la configuración activa.' }
            ]
        },
        {
            category: "Inicio",
            commands: [
                { cmd: 'git init', desc: 'Inicia un repositorio nuevo.' },
                { cmd: 'git clone <url>', desc: 'Descarga un repo existente.' },
                { cmd: 'git clone <url> .', desc: 'Clona en la carpeta actual.' }
            ]
        },
        {
            category: "Staging & Commits",
            commands: [
                { cmd: 'git status', desc: 'Ver estado de archivos.' },
                { cmd: 'git add .', desc: 'Prepara todos los cambios.' },
                { cmd: 'git add <archivo>', desc: 'Prepara un archivo específico.' },
                { cmd: 'git commit -m "msg"', desc: 'Guarda los cambios con mensaje.' },
                { cmd: 'git commit --amend', desc: 'Edita el último commit.' }
            ]
        },
        {
            category: "Historial",
            commands: [
                { cmd: 'git log --oneline', desc: 'Historial compacto de commits.' },
                { cmd: 'git log --graph', desc: 'Historial visual con ramas.' },
                { cmd: 'git diff', desc: 'Ver cambios sin guardar.' },
                { cmd: 'git diff HEAD', desc: 'Ver todos los cambios desde el último commit.' }
            ]
        },
        {
            category: "Ramas",
            commands: [
                { cmd: 'git branch', desc: 'Listar ramas locales.' },
                { cmd: 'git branch <nombre>', desc: 'Crear nueva rama.' },
                { cmd: 'git switch <nombre>', desc: 'Cambiar a otra rama (moderno).' },
                { cmd: 'git switch -c <nombre>', desc: 'Crear y cambiar a nueva rama.' },
                { cmd: 'git merge <nombre>', desc: 'Fusionar rama con la actual.' },
                { cmd: 'git branch -d <nombre>', desc: 'Eliminar rama fusionada.' }
            ]
        },
        {
            category: "Remoto",
            commands: [
                { cmd: 'git remote add origin <url>', desc: 'Conectar repo local con GitHub.' },
                { cmd: 'git push -u origin main', desc: 'Primer push y establece tracking.' },
                { cmd: 'git push', desc: 'Subir commits al remoto.' },
                { cmd: 'git pull', desc: 'Bajar y fusionar cambios.' },
                { cmd: 'git fetch', desc: 'Bajar cambios sin fusionar.' },
                { cmd: 'git remote -v', desc: 'Ver URLs remotas configuradas.' }
            ]
        },
        {
            category: "Deshacer",
            commands: [
                { cmd: 'git restore <archivo>', desc: 'Descartar cambios en working dir.' },
                { cmd: 'git restore --staged <archivo>', desc: 'Sacar archivo del staging.' },
                { cmd: 'git reset --soft HEAD~1', desc: 'Deshacer commit, mantener cambios.' },
                { cmd: 'git reset --hard HEAD~1', desc: '⚠️ Eliminar commit y cambios.' },
                { cmd: 'git revert <sha>', desc: 'Revertir commit sin borrar historial.' }
            ]
        },
        {
            category: "Avanzado",
            commands: [
                { cmd: 'git stash', desc: 'Guardar cambios temporalmente.' },
                { cmd: 'git stash pop', desc: 'Recuperar cambios guardados.' },
                { cmd: 'git cherry-pick <sha>', desc: 'Aplicar un commit específico.' },
                { cmd: 'git rebase <rama>', desc: 'Reescribir historial sobre otra rama.' },
                { cmd: 'git tag v1.0.0', desc: 'Crear etiqueta de versión.' }
            ]
        }
    ],
    en: [
        {
            category: "Setup",
            commands: [
                { cmd: 'git config --global user.name "Name"', desc: 'Set your global username.' },
                { cmd: 'git config --global user.email "mail"', desc: 'Set your global email.' },
                { cmd: 'git config --list', desc: 'View all active config.' }
            ]
        },
        {
            category: "Start",
            commands: [
                { cmd: 'git init', desc: 'Initialize new repo.' },
                { cmd: 'git clone <url>', desc: 'Download existing repo.' },
                { cmd: 'git clone <url> .', desc: 'Clone into current folder.' }
            ]
        },
        {
            category: "Staging & Commits",
            commands: [
                { cmd: 'git status', desc: 'Check file status.' },
                { cmd: 'git add .', desc: 'Stage all changes.' },
                { cmd: 'git add <file>', desc: 'Stage a specific file.' },
                { cmd: 'git commit -m "msg"', desc: 'Save changes with message.' },
                { cmd: 'git commit --amend', desc: 'Edit the last commit.' }
            ]
        },
        {
            category: "History",
            commands: [
                { cmd: 'git log --oneline', desc: 'Compact commit history.' },
                { cmd: 'git log --graph', desc: 'Visual branch history.' },
                { cmd: 'git diff', desc: 'View unstaged changes.' },
                { cmd: 'git diff HEAD', desc: 'All changes since last commit.' }
            ]
        },
        {
            category: "Branches",
            commands: [
                { cmd: 'git branch', desc: 'List local branches.' },
                { cmd: 'git branch <name>', desc: 'Create new branch.' },
                { cmd: 'git switch <name>', desc: 'Switch branch (modern).' },
                { cmd: 'git switch -c <name>', desc: 'Create and switch to new branch.' },
                { cmd: 'git merge <name>', desc: 'Merge branch into current.' },
                { cmd: 'git branch -d <name>', desc: 'Delete merged branch.' }
            ]
        },
        {
            category: "Remote",
            commands: [
                { cmd: 'git remote add origin <url>', desc: 'Connect local repo to GitHub.' },
                { cmd: 'git push -u origin main', desc: 'First push and set tracking.' },
                { cmd: 'git push', desc: 'Upload commits to remote.' },
                { cmd: 'git pull', desc: 'Download and merge changes.' },
                { cmd: 'git fetch', desc: 'Download without merging.' },
                { cmd: 'git remote -v', desc: 'View configured remote URLs.' }
            ]
        },
        {
            category: "Undo",
            commands: [
                { cmd: 'git restore <file>', desc: 'Discard working dir changes.' },
                { cmd: 'git restore --staged <file>', desc: 'Unstage a file.' },
                { cmd: 'git reset --soft HEAD~1', desc: 'Undo commit, keep changes.' },
                { cmd: 'git reset --hard HEAD~1', desc: '⚠️ Delete commit and changes.' },
                { cmd: 'git revert <sha>', desc: 'Revert commit without losing history.' }
            ]
        },
        {
            category: "Advanced",
            commands: [
                { cmd: 'git stash', desc: 'Save changes temporarily.' },
                { cmd: 'git stash pop', desc: 'Restore stashed changes.' },
                { cmd: 'git cherry-pick <sha>', desc: 'Apply a specific commit.' },
                { cmd: 'git rebase <branch>', desc: 'Rewrite history on top of branch.' },
                { cmd: 'git tag v1.0.0', desc: 'Create a version tag.' }
            ]
        }
    ]
}

export const GET_AI_INSTRUCTION = (lang: Language) => `
${lang === 'es' ? 'Eres GitPunk AI, asistente en español.' : 'You are GitPunk AI, an assistant in English.'}
OBJECTIVE: Guide the user in learning Git, GitHub, and Terminal commands related to version control.
STRICT PROTOCOL:
1. SCOPE: ONLY answer questions about Git, GitHub, and Terminal.
2. ACCESS DENIED: If topic is unrelated (cooking, politics, css, react, vercel), REFUSE with: "⚠️ ACCESS DENIED: ${lang === 'es' ? 'Tema fuera de alcance. Solo Git/GitHub.' : 'Topic out of scope. Only Git/GitHub.'}"
3. STYLE: Cyberpunk, futuristic, concise.
4. LANGUAGE: RESPOND ONLY IN ${lang === 'es' ? 'SPANISH' : 'ENGLISH'}.
`;