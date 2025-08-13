/* global KEEP */

KEEP.initModeToggle = () => {
  KEEP.utils.modeToggle = {
    themeModeToggleBtn: document.querySelector('.tool-toggle-theme-mode'),
    iconDom: document.querySelector('.tool-toggle-theme-mode i'),

    enableLightMode() {
      document.documentElement.classList.remove('dark-mode')
      document.documentElement.classList.add('light-mode')
      this.iconDom && (this.iconDom.className = 'fas fa-moon')
      KEEP.themeInfo.styleStatus.isDark = false
      KEEP.setStyleStatus()
    },

    enableDarkMode() {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
      this.iconDom && (this.iconDom.className = 'fas fa-sun')
      KEEP.themeInfo.styleStatus.isDark = true
      KEEP.setStyleStatus()
    },

    isDarkPrefersColorScheme() {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
    },

    initModeStatus() {
      const configMode = KEEP.theme_config?.base_info?.mode

      if (configMode === 'dark') {
        this.enableDarkMode()
        return
      }

      if (configMode === 'light') {
        this.enableLightMode()
        return
      }

      const styleStatus = KEEP.getStyleStatus()

      if (styleStatus) {
        styleStatus.isDark ? this.enableDarkMode() : this.enableLightMode()
      } else {
        this.isDarkPrefersColorScheme().matches ? this.enableDarkMode() : this.enableLightMode()
      }
    },

    initModeToggleButton() {
      if (this.themeModeToggleBtn && !this.themeModeToggleBtn?.hasClickListener) {
        this.themeModeToggleBtn.addEventListener('click', () => {
          const isDark = document.documentElement.classList.contains('dark-mode')
          isDark ? this.enableLightMode() : this.enableDarkMode()
        })
        this.themeModeToggleBtn.hasClickListener = true
      }
    },

    initModeAutoTrigger() {
      const isDarkMode = this.isDarkPrefersColorScheme()
      isDarkMode.addEventListener('change', (e) => {
        e.matches ? this.enableDarkMode() : this.enableLightMode()
      })
    }
  }

  KEEP.utils.modeToggle.initModeStatus()
  KEEP.utils.modeToggle.initModeToggleButton()
  KEEP.utils.modeToggle.initModeAutoTrigger()
}
