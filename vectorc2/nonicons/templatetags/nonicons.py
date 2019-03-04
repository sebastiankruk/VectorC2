#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import absolute_import

from django import template
from django.utils.html import format_html
from octicons.templatetags.octicons import Octicon

from . import NONICON_DATA

register = template.Library()


class Nonicon(Octicon):
    def __init__(self, symbol, **options):
        self.symbol = symbol
        self.octicon = NONICON_DATA.get(self.symbol)
        if not self.octicon:
            raise ValueError(
                "Couldn't find nonicon symbol for {}".format(self.symbol)
            )

        self.path = self.octicon['path']
        self.width = int(self.octicon['width'])
        self.height = int(self.octicon['height'])

        self.keywords = self.octicon['keywords']

        self.options = options
        self.options.update({
            "class": self.classes,
            "viewBox": self.viewBox,
            "version": "1.1"
        })

        self.options.update(self.size)

        self.options.update(self.a11y)

    @property
    def classes(self):
        return super(Nonicon, self).classes.replace('octicon', 'nonicon')


@register.simple_tag
def nonicon(symbol, **options):
    icon = Nonicon(symbol, **options)
    return format_html(icon.to_svg)
