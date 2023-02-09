job "redwood-saas-starter-ephemeral" {
  type = "service"
  # Note: "dc1" is the local machine's datacentre
  datacenters = ["dc1"]

  # Specify this job to have rolling updates, two-at-a-time, with
  # 30 second intervals.
  update {
    stagger      = "30s"
    max_parallel = 2
  }


  group "ledger" {
    count = 1 # number of instances

    network {
      port "api" {
        static = 3068
      }
    }

    task "ledger" {
      driver = "docker"

      config {
        image = "ghcr.io/formancehq/ledger:v1.8.1"
        ports = ["api"]
      }

      env {
        NUMARY_SERVER_HTTP_BIND_ADDRESS = "0.0.0.0:3068"
      }

      resources {
        memory = 256 # 256MB
      }
    }
  }

  group "temporal-cluster" {
    count = 1 # number of instances

    network {
      port "http" {
        static = 8233
      }
    }

    task "temporal" {
      driver = "docker"

      config {
        image = "slamdev/temporalite:0.3.0"
        ports = ["http"]
      }

      resources {
        memory = 256 # 256MB
      }
    }
  }

  group "supertokens" {
    count = 1 # number of instances

    network {
      port "api" {
        static = 3567
      }
    }

    task "supertokens" {
      driver = "docker"

      config {
        image = "registry.supertokens.io/supertokens/supertokens-postgresql:4.3"
        ports = ["api"]
      }

      resources {
        memory = 256 # 256MB
      }
    }
  }
}
