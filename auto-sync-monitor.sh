#!/bin/bash

# Script de monitoramento automático com sincronização via GitHub API
# Monitora alterações e faz push automático a cada 60 segundos

PROJECT_DIR="/home/ubuntu/faculdade_site_online"
LOG_FILE="/tmp/auto-sync-monitor.log"
SYNC_SCRIPT="$PROJECT_DIR/sync-github-secure.sh"
GITHUB_TOKEN="${GITHUB_TOKEN:-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}"

cd "$PROJECT_DIR"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "=========================================="
log "Auto-Sync Monitor - Faculdade LA"
log "=========================================="
log "Diretório: $PROJECT_DIR"
log "Token configurado: $([ -n "$GITHUB_TOKEN" ] && echo 'Sim' || echo 'Não')"
log "=========================================="

# Loop de monitoramento
while true; do
    # Verificar se há alterações a cada 60 segundos
    if git status --porcelain | grep -q .; then
        log "Alterações detectadas! Sincronizando com GitHub..."
        GITHUB_TOKEN="$GITHUB_TOKEN" bash "$SYNC_SCRIPT" 2>&1 | tee -a "$LOG_FILE"
    fi
    
    # Aguardar 60 segundos antes de verificar novamente
    sleep 60
done
