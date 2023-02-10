pipeline {
    agent any
    stages {
        stage('Performance Testing') {
            steps {
                bat 'k6 run API.js'
            }
        }
    }
}
