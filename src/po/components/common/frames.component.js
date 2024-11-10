class Frames {
  get centerFrame() {
    return $("//iframe[@name='_center']");
  }

  get contentFrame() {
    return $("//frame[@name='_content_frame']");
  }

  get menuFrame() {
    return $("//frame[@name='_menu_frame']");
  }

  get servicesFrame() {
    return $("//iframe[@id='iframe-w-services']");
  }

  get clientBillFrame() {
    return $("//iframe[@id='client_bill']");
  }

  /**
   * Switches to the content frame
   */
  async switchToContentFrame() {
    await browser.switchToFrame(null);
    await browser.waitUntil(async () => await this.centerFrame.isExisting(), {
      timeout: 3000,
    });
    await browser.switchToFrame(await this.centerFrame);
    await browser.waitUntil(async () => await this.contentFrame.isExisting(), {
      timeout: 3000,
    });
    await browser.switchToFrame(await this.contentFrame);
  }

  /**
   * Switches to the menu frame
   */
  async switchToMenuFrame() {
    await browser.switchToFrame(null);
    await browser.waitUntil(async () => await this.centerFrame.isExisting(), {
      timeout: 3000,
    });
    await browser.switchToFrame(await this.centerFrame);
    await browser.waitUntil(async () => await this.menuFrame.isExisting(), {
      timeout: 3000,
    });
    await browser.switchToFrame(await this.menuFrame);
  }

  /**
   * Switches to the services frame (located in the 'Bills' section)
   */
  async switchToServicesFrame() {
    await browser.switchToFrame(null);
    await browser.waitUntil(async () => await this.centerFrame.isExisting(), {
      timeout: 3000,
    });
    await browser.switchToFrame(await this.centerFrame);
    await browser.waitUntil(async () => await this.contentFrame.isExisting(), {
      timeout: 3000,
    });
    await browser.switchToFrame(await this.contentFrame);
    await browser.waitUntil(async () => await this.servicesFrame.isExisting(), {
      timeout: 3000,
    });
    await browser.switchToFrame(await this.servicesFrame);
  }

  /**
   * Switches to the client bill frame
   */
  async switchToClientBillFrame() {
    await browser.switchToFrame(null);
    await browser.waitUntil(async () => await this.centerFrame.isExisting(), {
      timeout: 3000,
    });
    await browser.switchToFrame(await this.centerFrame);
    await browser.waitUntil(async () => await this.contentFrame.isExisting(), {
      timeout: 3000,
    });
    await browser.switchToFrame(await this.contentFrame);
    await browser.waitUntil(async () => await this.clientBillFrame.isExisting(), {
      timeout: 3000,
    });
    await browser.switchToFrame(await this.clientBillFrame);
  }
}

module.exports = Frames;
