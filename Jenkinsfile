pipeline {
    agent any
    stages {
        stage('Performance Testing') {
            steps {
                echo 'Installing k6'
                sh 'sudo apt-get install k6'
                echo 'Running K6 performance tests...'
                sh 'k6 run API.js'
            }
        }
    }
}
