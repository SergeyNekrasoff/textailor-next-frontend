<template>
  <div
    class="mx-auto mt-16 w-[90%] max-w-[1280px] flex flex-col justify-center px-6 py-6 duration-500 bg-black_flash"
  >
    <div class="flex flex-1 flex-col max-w-screen-xl mx-auto">
      <div class="my-4 flex flex-col items-center justify-start p-2">
        <div class="flex items-center justify-between w-full mb-4">
          <h2 class="text-xl m-0">Overview</h2>
        </div>
        <div class="items-start justify-between w-full grid grid-cols-2 grid-rows-2 gap-4 mb-16">
          <div class="flex flex-col items-start justify-start w-[100%]">
            <h4 class="text-sm mb-2 text-gray_light_1 font-[600]">SUMMARY</h4>
            <p class="text-xs font-[300] text-gray">
              Your Free plan comes with <strong class="font-[600]">1 seat</strong> and
              <strong class="font-[600]">2000 words</strong> per month.
            </p>
          </div>
          <div class="flex flex-col items-start justify-start w-[100%]">
            <h4 class="text-sm mb-2 text-gray_light_1 font-[600]">WORKFLOW CREDITS</h4>
            <p class="text-xs font-[300] text-gray">
              You have <strong class="font-[600]">0 total</strong> credits available.
            </p>
          </div>
          <div class="flex flex-col items-start justify-start w-[100%]">
            <h4 class="text-sm mb-2 text-gray_light_1 font-[600]">TOTAL COST</h4>
            <div class="flex items-center justify-start">
              <div class="flex flex-col items-start justify-start mr-4">
                <div class="font-[600] text-xl text-white_mute">$0 /mo</div>
                <div class="text-xs font-[300] text-gray">Renews 4 apr 2025</div>
              </div>
              <BaseButton solid> Manage Billing </BaseButton>
            </div>
          </div>
          <div class="flex flex-col items-start justify-start w-[100%]">
            <h4 class="text-sm mb-2 text-gray_light_1 font-[600]">WORDS</h4>
            <p class="text-xs font-[300] text-blue_light">0/2 000 Words Used (0%)</p>
          </div>
        </div>

        <div class="flex items-center justify-between w-full mb-4">
          <h2 class="text-xl m-0">Plan</h2>
        </div>
        <div class="items-start justify-between w-full grid grid-cols-3 grid-rows-1 gap-4 mb-16">
          <div
            class="flex flex-col items-start justify-between border border-text_dark_4 p-4 h-[400px]"
          >
            <div class="flex flex-col items-start justify-start">
              <div class="text-xl mb-1">Free</div>
              <span class="text-xs leading-2 text-gray_light_1">
                For solo innovators dipping their toes into AI-powered solutions.
              </span>
              <ul class="mt-6 mb-4">
                <li class="my-0.5 font-[400]">1 Seat</li>
                <li class="my-0.5 font-[400]">2000 Words In Chat</li>
                <li class="my-0.5 font-[400]">200 Bonus Credits</li>
              </ul>
              <hr class="w-full border-t border-text_dark_4 mb-4" />
              <div class="text-lg text-blue_light font-[600]">Free Forever</div>
            </div>
            <BaseButton social disabled class="w-full">Current Plan</BaseButton>
          </div>
          <div
            class="flex flex-col items-start justify-between border border-text_dark_4 p-4 h-[400px]"
          >
            <div class="flex flex-col items-start justify-start">
              <div class="text-xl mb-1">Base</div>
              <span class="text-xs leading-2 text-gray_light_1">
                For solo entrepreneurs or small teams maximizing output.
              </span>
              <ul class="mt-6 mb-4">
                <li class="my-0.5 font-[400]">5 Seats</li>
                <li class="my-0.5 font-[400]">Unlimited Words In Chat</li>
                <li class="my-0.5 font-[400]">500 Workflow Credits</li>
                <li class="my-0.5 font-[400]">Per Month</li>
              </ul>
              <hr class="w-full border-t border-text_dark_4 my-4" />
              <div class="text-lg text-blue_light font-[600]">$19 /mo</div>
            </div>
            <BaseButton social class="w-full bg-green_darker">Upgrade to Base</BaseButton>
          </div>
          <div
            class="flex flex-col items-start justify-between border border-text_dark_4 p-4 h-[400px]"
          >
            <div class="flex flex-col items-start justify-start">
              <div class="text-xl mb-1">Pro</div>
              <span class="text-xs leading-2 text-gray_light_1">
                For ambitious businesses harnessing AI for exponential growth.
              </span>
              <ul class="mt-6 mb-4">
                <li class="my-0.5 font-[400]">20 Seats</li>
                <li class="my-0.5 font-[400]">Unlimited Words In Chat</li>
                <li class="my-0.5 font-[400]">3K Workflow Credits Per Month</li>
              </ul>
              <hr class="w-full border-t border-text_dark_4 my-4" />
              <div class="text-lg text-blue_light font-[600]">$149 /mo</div>
            </div>
            <BaseButton social class="w-full bg-green_darker">Upgrade to Pro</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue'
</script>
