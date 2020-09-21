<template>
  <div id="app" class="flex w-full h-screen antialiased bg-white">
    <div
      :style="{ width: '186px' }"
      class="grid overflow-y-scroll layout"
      :class="{ 'border-r border-cool-gray-300': windowExtended }"
    >
      <AppHeader
        :paletteEnabled="settings.paletteEnabled"
        @toggle-settings="toggleSettings"
        @toggle-palette="togglePalette"
      />

      <div class="p-4 pt-1">
        <label
          for="foreground"
          class="relative font-semibold tracking-wide uppercase text-xxs text-cool-gray-600"
        >
          Foreground
        </label>
        <div class="flex items-center mt-1">
          <BaseInput v-model="foreground" label="foreground" />
          <div class="ml-2">
            <EyeDropper
              class="w-4 h-4 rounded-full text-cool-gray-500 hover:text-cool-gray-700"
              :color="foreground"
              @click="setActive('foreground')"
              @spawn-dropper="spawnDropper"
            />
          </div>
        </div>

        <div class="mt-1">
          <label
            for="background"
            class="font-semibold tracking-wide uppercase text-xxs text-cool-gray-700"
          >
            Background
          </label>
          <div class="flex items-center mt-1">
            <BaseInput v-model="background" label="background" />
            <div class="pt-1 ml-2">
              <EyeDropper
                class="w-4 h-4 rounded-full text-cool-gray-500 hover:text-cool-gray-700"
                :color="background"
                @click="setActive('background')"
                @spawn-dropper="spawnDropper"
              />
            </div>
          </div>
        </div>

        <div class="pt-2 mt-2 border-t border-cool-gray-200">
          <Compliance :compliance="compliance" />
        </div>

        <div
          v-if="settings.sampleTextEnabled"
          class="pt-3 mt-3 border-t border-gray-200"
        >
          <Sample
            :text="sampleText"
            :foreground="foreground"
            :background="background"
          />
        </div>

        <div
          v-if="settings.spacingToolEnabled"
          class="pt-1 mt-3 border-t border-gray-200"
        >
          <SpacingUtil @copy-to-clipboard="copyToClipboard" />
        </div>
      </div>
    </div>

    <Palettes
      v-if="showPalette"
      @copy-to-clipboard="copyToClipboard"
      @close="togglePalette"
    />

    <Settings
      v-if="showSettings"
      :colorPickerEnabled="settings.colorPickerEnabled"
      :sampleTextEnabled="settings.sampleTextEnabled"
      :paletteEnabled="settings.paletteEnabled"
      :spacingToolEnabled="settings.spacingToolEnabled"
      @update:colorPickerEnabled="updateColorPickerEnabled"
      @update:sampleTextEnabled="updateSampleTextEnabled"
      @update:paletteEnabled="updatePaletteEnabled"
      @update:spacingToolEnabled="updateSpacingToolEnabled"
      @close="toggleSettings"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import _ from 'lodash'
import { colors } from 'tailwindcss/defaultTheme'
import { AppStoreSettings } from '@/store'
import { hexToRgb, luminance, getWCAGLevels, WCAGCompliant } from '@/utils'
import { Events, StoreEvents, UpdateStoreEvents } from '@/events'

import AppHeader from '@/components/Header.vue'
import BaseInput from '@/components/BaseInput.vue'
import EyeDropper from '@/components/Dropper.vue'
import Compliance from '@/components/Compliance.vue'
import Sample from '@/components/Sample.vue'
import SpacingUtil from '@/components/SpacingUtil.vue'

import Settings from '@/views/Settings.vue'
import Palettes from '@/views/Palettes.vue'

enum ColorInput {
  Foreground = 'foreground',
  Background = 'background'
}

export default defineComponent({
  name: 'Main',
  components: {
    AppHeader,
    BaseInput,
    EyeDropper,
    Compliance,
    Palettes,
    Sample,
    Settings,
    SpacingUtil
  },
  data() {
    return {
      sampleText: 'Lorem ipsum',
      foreground: '',
      background: '',
      activeInput: '' as ColorInput,
      showPalette: false,
      showSettings: false,
      settings: {
        colorPickerEnabled: false,
        sampleTextEnabled: false,
        paletteEnabled: false,
        spacingToolEnabled: false
      } as AppStoreSettings,
      spacing: ''
    }
  },
  async mounted(): Promise<void> {
    window.ipcRenderer.on(Events.ColorSelected, (e, color: string) => {
      if (this.activeInput === ColorInput.Foreground) {
        this.foreground = color
        return
      }

      this.background = color
    })

    const settings: AppStoreSettings = await window.ipcRenderer.invoke(
      StoreEvents.Initialize
    )
    this.settings = { ...settings }
  },
  methods: {
    copyToClipboard(value: string): void {
      window.ipcRenderer.send(Events.CopyToClipboard, value)
    },
    async togglePalette(): Promise<void> {
      if (this.showSettings) {
        this.showSettings = false
        this.showPalette = true
        return
      }

      this.showPalette = await window.ipcRenderer.invoke(
        Events.ToggleLargeWindow
      )
    },
    async toggleSettings(): Promise<void> {
      if (this.showPalette) {
        this.showPalette = false
        this.showSettings = true
        return
      }

      this.showSettings = await window.ipcRenderer.invoke(
        Events.ToggleLargeWindow
      )
    },
    setActive(forInput: ColorInput): void {
      this.activeInput = forInput
    },
    spawnDropper(): void {
      window.ipcRenderer.send(Events.CreateDropperWindow)
    },
    updateColorPickerEnabled(enabled: boolean): void {
      window.ipcRenderer.send(UpdateStoreEvents.ColorPickerEnabled, enabled)
      this.settings.colorPickerEnabled = enabled
    },
    updateSampleTextEnabled(enabled: boolean): void {
      window.ipcRenderer.send(UpdateStoreEvents.SampleTextEnabled, enabled)
      this.settings.sampleTextEnabled = enabled
    },
    updatePaletteEnabled(enabled: boolean): void {
      window.ipcRenderer.send(UpdateStoreEvents.PaletteEnabled, enabled)
      this.settings.paletteEnabled = enabled
    },
    updateSpacingToolEnabled(enabled: boolean): void {
      window.ipcRenderer.send(UpdateStoreEvents.SpacingToolEnabled, enabled)
      this.settings.spacingToolEnabled = enabled
    },
    translateTailwindColor(value: string): string {
      if (_.startsWith(value, '#')) {
        return value
      }

      const twColor = _.get(colors, value)

      if (_.isObject(twColor)) {
        return value
      }

      return twColor ? twColor : value
    }
  },
  computed: {
    compliance(): WCAGCompliant | null {
      const fg = hexToRgb(this.foreground)
      const bg = hexToRgb(this.background)

      if (!fg || !bg) {
        return {
          small: { aa: undefined, aaa: undefined },
          large: { aa: undefined, aaa: undefined }
        }
      }

      const fgLuminance = luminance(fg.r, fg.g, fg.b)
      const bgLuminance = luminance(bg.r, bg.g, bg.b)

      const ratio =
        fgLuminance > bgLuminance
          ? (bgLuminance + 0.05) / (fgLuminance + 0.05)
          : (fgLuminance + 0.05) / (bgLuminance + 0.05)

      return getWCAGLevels(ratio)
    },
    windowExtended(): boolean {
      return this.showSettings || this.showPalette
    }
  },
  watch: {
    foreground(value: string) {
      this.foreground = this.translateTailwindColor(value)
    },
    background(value: string) {
      this.background = this.translateTailwindColor(value)
    }
  }
})
</script>

<style scoped>
.layout {
  grid-template-rows: auto 1fr;
}
</style>
