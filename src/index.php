<?php //phpcs:disable

date_default_timezone_set('UTC');

$lang = strtolower( $_GET['lang'] );

$data = array(
    'pt' => [
        'title'   => '7 cliques para as estrelas',
        'back'    => 'VOLTAR',
        'score'   => 'Score',
        'loading' => 'Carregando',
        'blockquote' => [
            'Sete cliques para as estrelas',
            'é o melhor game de 2018 segundo os ouvintes do Gugacast.',
            'fonte que se diz confiável na',
            'Internet'
        ],
        'start' => 'INICIAR',
        'name'  => 'Digite seu nome',
        'next'  => 'PRÓXIMO',
        'startPoint'   => 'Pesquise o ponto de partida',
        'targetPoint'  => 'Pesquise o ponto de chegada',
        'researching'  => 'Pesquisando',
        'nothingFound' => 'Nada encontrado, pesquise outra palavra.'
    ],
    'en' => [
        'title'   => '7 clicks to the stars',
        'back'    => 'BACK',
        'score'   => 'Score',
        'loading' => 'Loading',
        'blockquote' => [
            'Seven clicks to the stars',
            'is the best game of 2018 according to the Gugacast listeners.',
            'source that is said to be trustworthy on the',
            'Internet'
        ],
        'start' => 'START',
        'name'  => 'Type your name',
        'next'  => 'NEXT',
        'startPoint'   => 'Search for the starting point',
        'targetPoint'  => 'Search for the arrival point',
        'researching'  => 'Searching',
        'nothingFound' => 'Nothing found, search for another word.'
    ],
    'it' => [
        'title'   => '7 clic per le stelle',
        'back'    => 'INDIETRO',
        'score'   => 'Score',
        'loading' => 'Caricamento in corso',
        'blockquote' => [
            'Sette clic per le stelle',
            'è il miglior gioco del 2018 secondo gli ascoltatori di Gugacast.',
            'fonte che si dice sia affidabile su',
            'Internet'
        ],
        'start' => 'INIZIARE',
        'name'  => 'Inserisci il tuo nome',
        'next'  => 'SEGUENTE',
        'startPoint'   => 'Cerca il punto di partenza',
        'targetPoint'  => 'Cerca il punto di arrivo',
        'researching'  => 'Ricerca',
        'nothingFound' => 'Niente trovato, cerca un\'altra parola.'
    ]
);

if( array_key_exists($lang, $data) ) {
    $data = $data[$lang];
} else {
    $lang = key($data);
    $data = current($data);
}

?><!DOCTYPE html>
<html lang="<?= $lang ?>">
<head>
    <!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-51072092-4"></script> -->
    <!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?= $data['title'] ?></title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
    <link href="css/minerva.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

    <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/2.5.1/firebaseui.css" />
</head>
<body class="container-fluid p-3 pt-5">
    <header>
        <!-- LOGO -->
        <figure id="logo" class="mx-auto mb-4">
            <img class="w-100 d-block" src="https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg" alt="Wikippedia logo">
            <p class="text-right text-muted"><em>by Maksuel</em></p>
        </figure>

        <!-- NAVBAR FIXED -->
        <nav id="back" class="navbar position-absolute p-2">
            <button class="btn btn-outline-light" type="button"><?= $data['back'] ?></button>
        </nav>

        <!-- INFOBAR FIXED -->
        <nav id="info" class="navbar fixed-top navbar-light bg-light pt-0 pb-0">
            <span class="navbar-text">
                <?= $data['score'] ?>: <span class="score">0</span>
            </span>
            <div class="fadeOutBox float-right">
                <span class="urls navbar-text float-right"></span>
            </div>
        </nav>
    </header>
    <main>
        <section id="preloading" class="text-center">
            <div class="loader mb-3 mx-auto"></div>
            <p class="text-light"><?= $data['loading'] ?></p>
        </section>

        <!-- WELCOME SCREEN -->
        <section id="welcome" class="text-center mx-auto">
            <!-- COMMENT -->
            <blockquote class="blockquote mb-5">
                <p class="mb-0 text-light">"<em><?= $data['blockquote'][0] ?></em> <?= $data['blockquote'][1] ?>"</p>
                <footer class="blockquote-footer"><?= $data['blockquote'][2] ?> <cite title="Internet"><?= $data['blockquote'][3] ?></cite></footer>
            </blockquote>

            <!-- BUTTON INIT -->
            <button class="btn btn-warning pl-5 pr-5 mb-5" type="button"><strong><?= $data['start'] ?></strong></button>
        </section>

        <form class="text-light mx-auto">
            <!-- NAME INPUT -->
            <section id="name" class="text-center">
                <div class="form-group">
                    <label for="nameInput" class="mb-4 w-100 h4"><?= $data['name'] ?></label>
                    <input id="nameInput" class="mb-4 form-control form-control-lg" type="text" maxlength="256">
                </div>
                <button class="mt-4 btn btn-warning pl-5 pr-5 mb-5" type="button"><strong><?= $data['next'] ?></strong></button>
            </section>

            <!-- START INPUT -->
            <section id="start" class="text-center">
                <div class="form-group">
                    <label for="startInput" class="mb-4 w-100 h4"><?= $data['startPoint'] ?></label>
                    <input id="startInput" class="mb-4 form-control form-control-lg" type="text">
                </div>
                <div class="box text-left mx-auto mb-5">
                    <p class="researching"><span class="loader float-left mr-2"></span><?= $data['researching'] ?>...</p>
                    <p class="nothingFound"><?= $data['nothingFound'] ?></p>
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link text-light" href="#"></a>
                            <p class="sr-only"></p>
                        </li>
                    </ul>
                </div>
            </section>

            <!-- TARGET INPUT -->
            <section id="target" class="text-center">
                <div class="form-group">
                    <label for="targetInput" class="mb-4 w-100 h4"><?= $data['targetPoint'] ?></label>
                    <input id="targetInput" class="mb-4 form-control form-control-lg" type="text">
                </div>
                <div class="box text-left mx-auto mb-5">
                    <p class="researching"><span class="loader float-left mr-2"></span><?= $data['researching'] ?>...</p>
                    <p class="nothingFound"><?= $data['nothingFound'] ?></p>
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link text-light" href="#"></a>
                            <p class="sr-only"></p>
                        </li>
                    </ul>
                </div>
            </section>

            <!-- CHECK INPUTS -->
            <section id="check">
                <div class="text-center">
                    <h1 class="h4 mb-4">Confira os dados</h1>
                    <div class="startPoint text-justify mb-4">
                        <h2 class="h5">Início: <strong class="heading">Example</strong></h2>
                        <p class="description mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet facilis debitis repudiandae ratione dolorum, omnis at possimus rerum odit maiores iure totam earum quam saepe enim soluta molestiae. Sed, neque.</p>
                        <p class="text-muted">url: <span class="url">https://www.example.com</span></p>
                    </div>
                    <div class="targetPoint text-justify mb-4">
                        <h2 class="h5">Objetivo: <strong class="heading">Example</strong></h2>
                        <p class="description mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos facilis eaque maiores voluptatum natus consequatur ipsum aliquam illo omnis cupiditate dolore quidem necessitatibus eum est, nesciunt praesentium nemo asperiores libero.</p>
                        <p class="text-muted">url: <span class="url">https://www.example.com</span></p>
                    </div>
                    <button class="mt-4 btn btn-warning pl-5 pr-5 mb-5" type="submit"><strong>COMEÇAR</strong></button>
                </div>

                <!-- RULES -->
                <div>
                    <h2 class="h4">Regras:</h2>
                    <ul class="mb-5">
                        <li>Só pode navegar nos links da Wikipédia.</li>
                        <li>Só pode usar a Wikipédia em português.</li>
                        <li>Uma vez que você foi, não pode voltar.</li>
                        <li>Cada vez que você clica, conta um clique.</li>
                        <li>Se chegar ao final e não tiver conseguido, a pontuação fica negativa.</li>
                    </ul>
                </div>
            </section>
        </form>
        

        <!-- GAME ARTICLE -->
        <article id="wikipedia" class="position-absolute w-100 p-3 pb-5">
            <div id="wmss" class="ml-auto mr-auto">
                <h1 class="border-bottom mb-4"></h1>
                <div class="content"></div>
            </div>
        </article>
    </main>
    <footer>
        <section id="bug" class="fixed-bottom m-2" style="width:calc(30px + 1rem);">
            <button type="button" data-toggle="popover" class="btn bg-transparent border-0 p-2" aria-label="Bug"><img class="btn-bug" src="svg/bug.svg"></button>
            <div class="bug-title d-none">
                <img class="title-bug align-text-top mr-2" src="svg/bug.svg"><strong>Relatório de erro</strong>
            </div>
            <div class="bug-content d-none">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil rem dolor deserunt, nam sapiente hic, iusto quaerat earum nemo odit minima tempore <button class="btn btn-link p-0 border-0" onclick="reportBug()">consequatur</button> ullam at, quisquam quia perferendis. Aperiam, adipisci.</p>
                <button class="btn btn-outline-dark btn-sm">Me remova!</button>
            </div>
        </section>
        <!-- ADSENSE -->
        <section id="adsense" class="fixed-bottom mb-3">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-9973799850345091"
                 data-ad-slot="6870500342"
                 data-ad-format="auto"></ins>
        </section>
    </footer>
    <!-- Modal -->
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="login-title" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="login-title">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="firebaseui-auth-container"></div>
                    <div id="loader">Loading...</div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase-firestore.js"></script>
    <script src="https://cdn.firebase.com/libs/firebaseui/2.5.1/firebaseui.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/popper.js/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
    <script>
        const ID = '<?= uniqid( substr( bin2hex( random_bytes(2) ), -3 ) ) ?>';
        const DB = '<?= isset( $_GET['developing'] ) ? 'bigdata_dev' : 'bigdata' ?>';
        // const DB_LOGGED = '';

        <?= isset( $_GET['developing'] ) ? '( function($){ $(\'#login\').modal(\'show\'); })(jQuery);' : '' ?>
    </script>
    <script src="js/global.js"></script>
    <script src="js/helpers.js"></script>
    <script src="js/preloading.js"></script>
    <script src="js/logo.js"></script>
    <script src="js/back.js"></script>
    <script src="js/welcome.js"></script>
    <script src="js/name.js"></script>
    <script src="js/startTarget.js"></script>
    <script src="js/check.js"></script>
    <script src="js/wikipedia.js"></script>
    <script src="js/core.js"></script>
    <!-- <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-51072092-4');
        // ADSENSE
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script> -->
</body>
</html>